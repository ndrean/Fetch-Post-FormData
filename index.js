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

const serializeForm = (formdata) => {
  let obj = {};
  let params = new URLSearchParams();
  // iterate on a FormData using FormData directly, and not using  Object.entries(FormData)
  for (let [k, v] of formdata) {
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
  // document.querySelector(tag).addEventListener("submit", async (e) => {
  document.querySelector(tag).onsubmit = async (e) => {
    e.preventDefault();
    try {
      const myform = new FormData(e.target);
      const response = await fetch(uriu, {
        method: "POST",
        // 'fetch' accepts a FromData object as a body, 'Content-Type:multipart/forma-data'
        body: myform,
        /* body: serializeForm(myform).payload is possible, if end-point wants a string.
        In that case, we need to declare header : { "Content-type: "application/json"} */
      });

      if (!response.ok) {
        return Promise.reject(response);
      }

      const data = await response.json();
      console.log(data);

      // part for the HTML rendering
      insert(
        "We listen to the submit of the form and pass directly <code>body: new FormData(e.target)</code>."
      );
      display(
        "The API responds to the Post request by giving a new ID with timestamp: ",
        "ID :" + data.id + ", the " + data.createdAt
      );
      insert(
        "The data in the form can be transformed into a query string for GET by URLSearchParams:"
      );
      insert(`<p> ${serializeForm(myform).queryString}</p>`);
      insert(
        "For a POST request, we can pass also the payload as a string by serializing  (formdata => object) and then stringify this json"
      );
      insert(`<p> ${serializeForm(myform).payload}</p>`);
    } catch (error) {
      console.warn(error);
    }
  };
}

getData("form").then(userForm.reset());
