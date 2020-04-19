const display = async (response, text) => {
  return document
    .querySelector("#resu1")
    .insertAdjacentHTML("beforeend", `<p>${text}: &nbsp ${response} </p> <br>`);
};

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userForm = document.querySelector("form");
  const myForm = new FormData(userForm);

  const uriu = "https://reqres.in/api/users/";
  // const uriu = "https://jsonplaceholder.typicode.com/users";
  // const request = new Request(uriu, { method: "POST", body: myForm });
  let objEntries = {};
  let arrayKeys = [];
  let arrayDisplay = [];
  // iterate on a FormData with FormData.entries and not Object.entries(FormData)

  const show = async () => {
    for (let [k, v] of myForm.entries()) {
      display(v, k);
    }
  };

  try {
    const response = await fetch(uriu, { method: "POST", body: myForm });
    const result = await response.json();
    display(result.id, "Post Fetch new ID :").then(show());
  } catch (err) {
    console.log(err);
  }
});
