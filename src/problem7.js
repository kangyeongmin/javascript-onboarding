function findFriendsOfUser(user, friends) {
  let friendsArray = [];

  friends.forEach((friend) => {
    if (friend.includes(user)) {
      let myFriend = friend.filter((element) => element !== user);
      friendsArray.push(myFriend[0]);
    }
  });

  return friendsArray;
}

function findFriendsOfFriend(user, friendsOfUser, friends) {
  let friendsOfFriend = [];

  friends.forEach((friend) => {
    friendsOfUser.forEach((myFriend) => {
      if (friend.includes(myFriend) && !friend.includes(user)) {
        let yourFriend = friend.filter((element) => element !== myFriend);
        friendsOfFriend.push(yourFriend[0]);
      }
    });
  });

  return friendsOfFriend;
}

function makeCandidatesScore(friends, visitors, friendsOfUser) {
  let candidatesArray = [];

  friends.forEach((friend) => {
    let isDone = false;
    candidatesArray.forEach((candidate, index) => {
      if (candidate.includes(friend)) {
        candidatesArray[index][1] += 10;
        isDone = true;
      }
    });
    if (!isDone) {
      candidatesArray.push([friend, 10]);
    }
  });

  visitors.forEach((visitor) => {
    let isDone = false;
    candidatesArray.forEach((candidate, index) => {
      if (candidate.includes(visitor)) {
        candidatesArray[index][1]++;
        isDone = true;
      }
    });
    if (!isDone && !friendsOfUser.includes(visitor)) {
      candidatesArray.push([visitor, 1]);
    }
  });

  return candidatesArray;
}

function sortCandidatesArray(candidatesArray) {
  let newArray = candidatesArray.sort((prev, cur) => {
    if (prev[1] > cur[1]) return -1;
    else if (prev[1] < cur[1]) return 1;
    else {
      if (prev[0] > cur[0]) return 1;
      if (prev[0] < cur[0]) return -1;
    }
  });

  return newArray;
}

function getRecommendFriends(candidatesArray) {
  let recommendFriends = [];

  if (candidatesArray.length > 5) {
    candidatesArray.slice(0, 4);
  }

  candidatesArray.forEach((candidate) => {
    recommendFriends.push(candidate[0]);
  });

  return recommendFriends;
}

function problem7(user, friends, visitors) {
  const friendsOfUser = findFriendsOfUser(user, friends);
  const friendsOfFriend = findFriendsOfFriend(user, friendsOfUser, friends);
  const candidatesArray = makeCandidatesScore(
    friendsOfFriend,
    visitors,
    friendsOfUser
  );

  return getRecommendFriends(sortCandidatesArray(candidatesArray));
}

module.exports = problem7;
