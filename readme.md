## Post a form with fetch and use FormData and render asynchronously the data

Displayed at: <http://postFormData.surge.sh>

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
display("Post Fetch new ID :", result.id).then(show());
```
