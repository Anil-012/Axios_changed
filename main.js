// const { default: axios } = require("axios");

// axios.defaults.headers.common['X-Auth-Token'] =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
//-------
// function getTodos() {
//   // console.log('GET Request here');
//   axios({ method: 'get',
// url: 'https://jsonplaceholder.typicode.com/todos' })
// .then(res => console.log(res)).catch(err => console.log(err));
// }
//--------------------
//istead of res we can reuse method to display on screen which we made
function getTodos() {
  // console.log('GET Request here');
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 6
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.log(err));
  //now shorten this code ---
  axios.get('https://jsonplaceholder.typicode.com/todos', { params: { _limit: 10 } },{ timeout: 2000 }) //it should not take morethan 2 second
    //(instead of param we can use "https://jsonplaceholder.typicode.com/todos?_limit=5" after get )
    //also only axios cn allow us to fetch data from this url no need to use getmethod
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}
//01 then(res => console.log(res)) here we can use multiple methods one of them is res.data so that we will get specific data only then(res => console.log(res.data)).
//02 can use showoutput method which created to show on main webpage
//03 also we can llimit of data like we want to fetch only 5 data so that we can use here using "https://jsonplaceholder.typicode.com/todos?_limit=5"  -->it is after (todo UseParam_undrscoreLimit=5)
//04 also we can shorten this up 

// POST REQUEST
function addTodo() {
  // console.log('POST Request');
  // axios({
  //   method: 'post',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   data:
  //    {
  //     title: 'New TOdo added ',
  //     completed: true,
  //     // work: 123456,
  //     // number: "sofware"
  //   }
  //-->>shorten 
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'New TOdo added ',
    completed: false
  }).then(res => showOutput(res)).catch(err => console.error(err));
  //===+++++------

  // [{
  //   title: 'New TOdo added ',
  //   completed: true,
  //   // work: 123456,
  //   // number: "sofware"
  // },{
  //   title: 'New TOdo added ',
  //   completed: false,
  //   // work: 123456,
  //   // number: "sofware"
  // }]
  // })
  //   //here we dont need param because we are sending data it will update data on server with new id++ 
  //   .then(res => showOutput(res)).catch(err => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // console.log('PUT/PATCH Request');
  //instead of patch cn use put
  axios.patch('https://jsonplaceholder.typicode.com/todos/2', {
    title: 'New Todo changed',
    completed: true
  }).then(res => showOutput(res)).catch(err => console.error(err));
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/3').then(res => showOutput(res)).catch(err => console.error(err));
}

// SIMULTANEOUS DATA
// post and todo's at the same time
function getData() {
  // console.log('Simultaneous Request');
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=11'),
    axios.get('https://jsonplaceholder.typicode.com/todos')
  ])
    // .then(res => {
    //   console.log(res[0]);
    //   console.log(res[1]);

    //   showOutput(res[1]);//for window show
    // }
    // )
    // .catch(err => console.error(err));
    //shorten-->>
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err));
}

// CUSTOM HEADERS
function customHeaders() {
  // console.log('Custom Headers');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  };

  axios
    .post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        title: 'New Todo',
        completed: false
      },
      config
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  // console.log('Transform Response');
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  // console.log('Error Handling');
  axios
  .get('https://jsonplaceholder.typicode.com/todoss', {
    // validateStatus: function(status) {
    //   return status < 500; // Reject only if status is greater or equal to 500
    // }
  })
  .then(res => showOutput(res))
  .catch(err => {
    if (err.response) {
      // Server responded with a status other than 200 range
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      if (err.response.status === 404) {
        alert('Error: Page Not Found');
      }
    } else if (err.request) {
      // Request was made but no response
      console.error(err.request);
    } else {
      console.error(err.message);
    }
  });
}

// CANCEL TOKEN
function cancelToken() {
  // console.log('Cancel Token');
  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      }
    });

  if (true) {
    source.cancel('Request canceled!');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
   // showing timeRequestValue

axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${config.url
      // } at ${new Date().getTime()}`
       } at ${new Date()}`
    );
 
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES
 
const axiosInstance = axios.create({
  // Other custom settings
  baseURL: 'https://jsonplaceholder.typicode.com'
});
// axiosInstance.get('/comments').then(res => showOutput(res));


// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
