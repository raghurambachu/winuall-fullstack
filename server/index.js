const express = require("express");
const axios = require("axios");
const url = require("url");

const app = express();

const intersection = (list1, list2) =>
  list1.filter(
    ((set) => (a) => set.has(a.login))(new Set(list2.map((b) => b.login)))
  );

app.get("/github/mutual", async (req, res, next) => {
  let urlPart = url.parse(req.url, true);
  const { primaryUser, secondaryUser } = urlPart.query;

  if (!primaryUser || !secondaryUser)
    return res.json({
      msg: "Either primary user or secondary user has not been provided",
    });
  try {
    // primary user following_url - Users to whom primary user is following
    const following = axios.get(
      `https://api.github.com/users/${primaryUser}/following`
    );

    // secondary user followers_url - Users who follow the secondary User
    const followers = axios.get(
      `https://api.github.com/users/${secondaryUser}/followers`
    );

    axios.all([following, followers]).then(
      axios.spread((...responses) => {
        const [followingArr, followersArr] = responses;

        const intersectionArr = intersection(
          followersArr.data,
          followingArr.data
        );
        return res.json({
          intersectionArr,
        });
      })
    );
  } catch (err) {
    return res.json({ error: err, status: "failed" });
  }
});

app.get("/github/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await axios.get(`https://api.github.com/users/${username}`);
    if (user.data.message) {
      return res.json({ data: "Not found", status: "failed" });
    }
    return res.json({ data: user.data });
  } catch (err) {
    return res.json({ data: err, status: "failed" });
  }
});

//Set the port that you want the server to run on
const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Server connected at port " + port));
