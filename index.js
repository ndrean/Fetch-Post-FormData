const display = async (mykey, myvalue) => {
  return document
    .querySelector("#resu1")
    .insertAdjacentHTML("beforeend", `<p>${mykey}: &nbsp ${myvalue} </p> <br>`);
};

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userForm = document.querySelector("form");
  const myForm = new FormData(userForm);

  const uriu = "https://reqres.in/api/users/";

  // iterate on a FormData with FormData.entries and not Object.entries(FormData)
  const show = async () => {
    for (let [k, v] of myForm.entries()) {
      display(k, v);
    }
  };

  try {
    const response = await fetch(uriu, { method: "POST", body: myForm });
    const result = await response.json();
    display("Post Fetch new ID :", result.id).then(show());
  } catch (err) {
    console.log(err);
  }
});
