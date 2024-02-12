// const express = require('express');
// const leetcode = require('leetcode-query';
import { LeetCode } from "leetcode-query";
import express from "express";

const PORT = process.env.PORT || 4000;
const leetcode = new LeetCode();

const app = express();

//sma280201

app.get("/profiles", async (req, res) => {
  try {
    const user1 = req.query.user1;
    const user2 = req.query.user2;

    const profile1 = await leetcode.user(user1);
    const profile2 = await leetcode.user(user2);

    console.log({ profile1, profile2 });

    // res.json({profile1, profile2});

    if (profile1.matchedUser && profile2.matchedUser) {
      const profileData1 = profile1.matchedUser;
      const response1 = {
        username: profileData1.username,
        realName: profileData1.profile.realName,
        userAvatar: profileData1.profile.userAvatar,
        countryName: profileData1.profile.countryName,
        submitStats: profileData1.submitStats,
        badges: profileData1.badges.map((badge) => ({ icon: badge.icon })),
      };

      const profileData2 = profile2.matchedUser;
      const response2 = {
        username: profileData2.username,
        realName: profileData2.profile.realName,
        userAvatar: profileData2.profile.userAvatar,
        countryName: profileData2.profile.countryName,
        submitStats: profileData2.submitStats,
        badges: profileData2.badges.map((badge) => ({ icon: badge.icon })),
      };

      res.json({response1,response2});
    } else {
      throw new Error("username incorrect");
    }
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
