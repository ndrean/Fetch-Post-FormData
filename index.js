const uriu = "https://reqres.in/api/users/";
const userForm = document.querySelector("form");

const display = (mykey, myvalue) => {
  return document
    .querySelector("#resu1")
    .insertAdjacentHTML("beforeend", `<p>${mykey}: &nbsp ${myvalue} </p> <br>`);
};

const insert = (text) => {
  return document
    .querySelector("#resu1")
    .insertAdjacentHTML("beforeend", `<p> ${text}</p>`);
};

// iterate on a FormData using FormData.entries and not using  Object.entries(FormData)
const serializeForm = (formData) => {
  let obj = {};
  let params = new URLSearchParams();
  let payload = "";
  for (let [k, v] of formData.entries()) {
    obj[k] = v;
    params.append(k, v);
  }
  return {
    obj: obj,
    queryString: params.toString(),
    payload: JSON.stringify(obj),
  };
};

async function getData(tag) {
  document.querySelector(tag).addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const myform = new FormData(e.target);
      const response = await fetch(uriu, {
        method: "POST",
        body: new FormData(e.target),
        // body: serializeForm(myform).payload,
      }); // new FormData(document.querySelector('form'))
      if (!response.ok) {
        return Promise.reject(response);
      }
      const data = await response.json();
      insert(
        "We normally pass the <code>new FormData(e.target)</code> to the <em>body</em> of the <em>fetch</em> request."
      );
      display("Your new ID is: ", data.id);
      insert(
        "The data in the form can be transformed into a query string for GET by URLSearchParams:"
      );
      insert(`<p> ${serializeForm(myform).queryString}</p>`);
      insert(
        "For a POST request, we pass also may to pass the FormData by serializing it into an object and stringify this json"
      );
      insert(`<p> ${serializeForm(myform).payload}</p>`);
    } catch (error) {
      console.warn(error);
    }
  });
}

getData("form").then(userForm.reset());
