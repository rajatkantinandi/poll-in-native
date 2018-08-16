const links = {
  root: "https://poll-in.herokuapp.com",
  login: {
    url: "/signin",
    method: "POST",
    params: ["username", "password"]
  },
  signup: {
    url: "/signup",
    method: "POST",
    params: ["username", "password"]
  },
  validateUser: {
    url: "/checkavailuser/",
    params: "username"
  },
  userpage: {
    url: "/u/",
    params: "userid"
  },
  trendingPolls: "/trending-polls",
  newPoll: {
    url: "/new-poll",
    method: "POST",
    params: ["userid", "question", "numOfOptions", "...optionsObj"]
  },
  deletePoll: {
    url: "/deletepoll",
    method: "GET",
    params: ["userid", "id"]
  },
  vote: {
    url: "/vote",
    method: "POST",
    params: ["id", "poll"]
  },
  addOption: {
    url: "/add-option",
    method: "GET",
    params: ["id", "option"]
  },
  profile: {
    url: "/profile/",
    params: "username"
  }
};

export default async function(type, params) {
  if (links.hasOwnProperty(type)) {
    const reqObj = links[type];
    if (typeof reqObj == "string") {
      const response = await fetch(links.root + reqObj);
      return response;
    } else if (reqObj.hasOwnProperty("method")) {
      if (reqObj.method == "POST") {
        const data = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(params)
        };
        const response = await fetch(links.root + reqObj.url, data);
        return response;
      } else if (
        reqObj.method == "GET" &&
        Array.isArray(params) &&
        params.length == reqObj.params.length
      ) {
        let url = links.root + reqObj.url + "?";
        for (let i = 0; i < reqObj.params.length; i++) {
          url += reqObj.params[i] + "=" + params[i];
          if (i < reqObj.params.length - 1) {
            url += "&";
          }
        }

        const response = await fetch(url);
        return response;
      }
    } else if (typeof params == "string") {
      const response = await fetch(links.root + reqObj.url + params);
      return response;
    }
  } else return undefined;
}
