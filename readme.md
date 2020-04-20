## Post a form with fetch and use FormData and render data from an API asynchronously

Displayed at: <http://postFormData.surge.sh>

API used to POST : <https://reqres.in/api/users/>

Declare an `async` rendering function:

```javascript
const display = async (mykey, myvalue) => {
  return document
    .querySelector("#resu1")
    .insertAdjacentHTML("beforeend", `<p>${mykey}: &nbsp ${myvalue} </p> <br>`);
};
```

Iterate over the `FormData` entries and render an asynchronous function:

```javascript
const show = async () => {
  for (let [k, v] of myForm.entries()) {
    display(k, v);
  }
};
```

and chain the promises:

```javascript
const myForm = new FormData(userForm);
const response = await fetch(uriu, { method: "POST", body: myForm });
display("Post Fetch new ID :", response.id)
  .then(show())
  .then(document.querySelector("form").reset());
```
