## Post a form with fetch and use FormData and render data from an API asynchronously

Displayed with [surge](https://surge.sh) at: <https://postFormData.surge.sh>

API used to POST : uriu: <https://reqres.in/api/users/>

Iterate over the `FormData` and render an object that contains:

- the formdata entries as an object,
- the formdata entries as a query String
- the formadata as a string

```javascript
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
```

and chain the promises:

```javascript
document.querySelector(tag).onsubmit = async (e) => {
  e.preventDefault();
  try {
    const myform = new FormData(e.target);
    const response = await fetch(uriu, {
      method: "POST",
      body: myform,
    });

    if (!response.ok) {
      return Promise.reject(response);
    }
    return await response.json();
  } catch (error) {
    console.warn(error);
  }
};
```
