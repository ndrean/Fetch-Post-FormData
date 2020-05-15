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
  for (let [k, v] of formData.entries()) {
    // create on object from the FormData
    obj[k] = v;
    // create an URLSearcParams from the FormData
    params.append(k, v);
  }
  // the function will return an object with 3 keys, depending upon usage
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
        // body: serializeForm(myform).payload is possible, depending upon URL
      });

      if (!response.ok) {
        return Promise.reject(response);
      }

      const data = await response.json();

      // part for the HTML rendering
      insert(
        "We normally pass the <code>new FormData(e.target)</code> after listening to the submit of the form. We pass this directly to the <em>body</em> of the <em>fetch</em> request."
      );
      display(
        "The API responds to the Post request by giving a new ID, which is : ",
        data.id
      );
      insert(
        "The data in the form can be transformed into a query string for GET by URLSearchParams:"
      );
      insert(`<p> ${serializeForm(myform).queryString}</p>`);
      insert(
        "For a POST request, we can pass the payload as a string by serializing  (formdata => object) and then stringify this json"
      );
      insert(`<p> ${serializeForm(myform).payload}</p>`);
    } catch (error) {
      console.warn(error);
    }
  });
}

getData("form").then(userForm.reset());
