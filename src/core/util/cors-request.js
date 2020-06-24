async function corsGetRequest(url) {
  let req = await fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  let json = await req.json();
  return json;
}

export { corsGetRequest };
