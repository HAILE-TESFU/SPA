window.onload = singlePageApp;

function singlePageApp() {
  let image1BodyTemplete = `
<div class="container">
<h3>Welcome to eLibrary</h3>
<img src="./IMAGES/topicals.png" alt=""> <br> <br>
<p>This computer science is really awesome</p>
<p>I am enjoying coding too much</p>
</div>`;

  let image2BodyTemplete = `
<div class="container">
<h3>Welcome to eLibrary</h3>
<img src="./IMAGES/banner1.png" alt=""> <br> <br>
<p>This computer science is really awesome</p>
<p>I am enjoying coding too much</p>
</div>`;

  let image3BodyTemplete = `
<div class="container">
<h3>Welcome to eLibrary</h3>
<img src="./IMAGES/panoramic.png" alt=""> <br> <br>
<p>This computer science is really awesome</p>
<p>I am enjoying coding too much</p>
</div>`;

  let addNewBookButton = `
<div class="container">
    <h3 style="float: left;">Books in our collection</h3>
    <a id='addnewbookbutton' href="#" class="btn btn-primary" role="button" style="float: right;margin: 10px;">Add New Books</a>
    <div id="get">
    </div>
  </div>`;

  let addNewBookForm = `
  <div id='editBook1' class="container">
  <h2>New Book Form</h2>
  <div>
    <h7>"Book title":</h7><br>
    <input class="p" id="p1" type="text" size="148"> <br>
  </div>
  <div id="d2">
    <h7>"ISBN"</h7><br>
    <input class="p" id="p2" type="text" size="90">
  </div>
  <div id="d3">
    <h7>"Over due Fee per day"</h7> <br>
    <input class="p" id="p3" type="text" size="50" placeholder="0.000">
  </div>
  <div id="d4">
    <h7> publisher</h7> <br>
    <input class="p" id="p4" type="text" size="90">
  </div>
  <div id="d5">
    <h7>date Published </h7> <br>
    <input class="p" id='p5' type="text" size="50" placeholder="yy-mm-dd">
  </div>

  <div>
    <button id="btn2">Reset</button>
  </div>
  <div>
    <button id="btn1">Save Books</button>
  </div>
  </div>`;

  `
  <div class="modal fade" id="confirmDeleteBookModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Confirm Delete</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p><b>Are you sure you wish to delete this book?</b></p>
          <br />
          <p id="deleteModalBookISBN"></p>
          <p id="deleteModalBookTitle"></p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
          <button id="deleteModalBtnYes" type="button" class="btn btn-primary">Yes</button>
        </div>
      </div>
    </div>
  </div>`;

  eLibrary("eLibrary");

  function eLibrary(page) {
    if (page === "eLibrary") {
      document.getElementById("changepage").innerHTML = image1BodyTemplete;
    }
    if (page === "about") {
      document.getElementById("changepage").innerHTML = image2BodyTemplete;
    }
    if (page === "home") {
      document.getElementById("changepage").innerHTML = image1BodyTemplete;
    }
    if (page === "virtualtour") {
      document.getElementById("changepage").innerHTML = image3BodyTemplete;
    }
    if (page === "books") {
      document.getElementById("changepage").innerHTML = fetching("res");
    }
    if (page === "addnewbooks") {
      document.getElementById("changepage").innerHTML = addNewBookForm;
    }
    if (page === "addnewbookbutton") {
      document.getElementById("changepage").innerHTML = addNewBookForm;
    }
  }

  //for displaying the home navbar
  let home = document.getElementById("home");
  home.addEventListener("click", function(e) {
    eLibrary("home");
  });

  //for displaying the about navBar;
  let about = document.getElementById("about");
  about.addEventListener("click", function(e) {
    eLibrary("about");
  });

  //for diplaying the virtual tour navbar
  let virtualTour = document.getElementById("virtualtour");
  virtualTour.addEventListener("click", function(e) {
    eLibrary("virtualtour");
  });

  let books = document.getElementById("books");
  books.addEventListener("click", function(e) {
    eLibrary("books");
  });

  //for displaying the adding new book forms
  let addNewbooksButton = document.getElementById("addnewbooks");
  addNewbooksButton.addEventListener("click", function(e) {
    eLibrary("addnewbooks");
  });

   //search button
   let searchButton = document.getElementById("searchButton1");
   searchButton.addEventListener("click", searchbook);

  //for displaying the book lists

  async function fetching(res) {
    if (res === "res") {
      let response = await fetch(
        "https://elibraryrestapi.herokuapp.com/elibrary/api/book/list"
      );
      //console.log(response);
      const responsed = await response.json();
      //console.log(response);

      let table = document.getElementById("changepage");

      let tablebooks = `<table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">ISBN</th>
                          <th scope="col">BOOK TITLE</th>
                          <th scope="col">FEE PER DAY</th>
                          <th scope="col">PUBLISHER</th>
                          <th scope="col">DATE PUBLISHED</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>`;
      let count = 0;
      responsed.forEach(element => {
        count++;
        tablebooks += `
                   
                        <tr class="table-active">
                          <th scope="row">${count}</th>
                          <td>${element.isbn}</td>
                          <td>${element.title}</td>
                          <td>${element.overdueFee}</td>
                          <td>${element.publisher}</td>                     
                          <td>${element.datePublished}</td>
                          <td><a href="#"  onclick="getBookId(bookId=${element.bookId})">Edit</a></td>
                         <td><a data-toggle="modal" data-bookid="${element.bookId}" data-bookisbn="${element.isbn}" data-booktitle="${element.title}" href="#confirmDeleteBookModal">Delete</a></td>
                        </tr>`;
      });
      table.innerHTML = addNewBookButton + tablebooks;

      //adding event listner for add book button
      let addNewbooksButton1 = document.getElementById("addnewbookbutton");
      addNewbooksButton1.addEventListener("click", function(e) {
        eLibrary("addnewbookbutton");

        //adding event listener for the save book button
        let btnsave = document.getElementById("btn1");
        btnsave.addEventListener("click", bookPosts);
      });
    } else {
      let table = document.getElementById("changepage");

      let tablebooks = `<table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">ISBN</th>
                          <th scope="col">BOOK TITLE</th>
                          <th scope="col">FEE PER DAY</th>
                          <th scope="col">PUBLISHER</th>
                          <th scope="col">DATE PUBLISHED</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>`;
      let count = 0;
      res.forEach(element => {
        count++;
        tablebooks += `
                   
                        <tr class="table-active">
                          <th scope="row">${count}</th>
                          <td>${element.isbn}</td>
                          <td>${element.title}</td>
                          <td>${element.overdueFee}</td>
                          <td>${element.publisher}</td>                     
                          <td>${element.datePublished}</td>
                          <td><a href="#"  onclick="getBookId(bookId=${element.bookId})">Edit</a></td>
                         <td><a data-toggle="modal" data-bookid="${element.bookId}" data-bookisbn="${element.isbn}" data-booktitle="${element.title}" href="#confirmDeleteBookModal">Delete</a></td>
                        </tr>`;
      });
      table.innerHTML = addNewBookButton + tablebooks;
    }
  }

  $("#confirmDeleteBookModal").on("show.bs.modal", function(event) {
    const deletelink = $(event.relatedTarget);
    const bookId = deletelink.data("bookid");
    const bookISBN = deletelink.data("bookisbn");
    const bookTitle = deletelink.data("booktitle");
    const theModalDialog = $(this);
    console.log(bookId);
    theModalDialog.find("#deleteModalBookISBN").text("ISBN:" + bookISBN);
    theModalDialog
      .find("#deleteModalBookTitle")
      .text("Book Title: " + bookTitle);
    $("#deleteModalBtnYes").on("click", function(evt) {
      fetch(
        `https://elibraryrestapi.herokuapp.com/elibrary/api/book/delete/${bookId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      ).then(function(response) {
        console.log(`Successfully deleted Book with ID:${bookId}`);
        $("#confirmDeleteBookModal").modal("hide");
        fetching("response");
      });
    });
  });

  $("#confirmDeleteBookModal").on("hidden.bs.modal", function(event) {
    alert("deleted succesfuly");
  });

  async function searchbook() {
    let bookName = document.getElementById("searchbook1").value;
    console.log(bookName);
    let response = await fetch(
      "https://elibraryrestapi.herokuapp.com/elibrary/api/book/list"
    );
    //console.log(response);
    const responsed = await response.json();
    console.log(responsed);
    let data = [];

    for (let j = 0; j < responsed.length; j++) {
      if (bookName === responsed[j].title) {
        data.push(responsed[j]);
      }
    }
    console.log(data);
    fetching(data);
  }
}

let addNewBookForm = `
  <div id='editBook1' class="container">
  <h2>New Book Form</h2>
  <div>
    <h7>"Book title":</h7><br>
    <input class="p" id="p1" type="text" size="148"> <br>
  </div>
  <div id="d2">
    <h7>"ISBN"</h7><br>
    <input class="p" id="p2" type="text" size="90">
  </div>
  <div id="d3">
    <h7>"Over due Fee per day"</h7> <br>
    <input class="p" id="p3" type="text" size="50" placeholder="0.000">
  </div>
  <div id="d4">
    <h7> publisher</h7> <br>
    <input class="p" id="p4" type="text" size="90">
  </div>
  <div id="d5">
    <h7>date Published </h7> <br>
    <input class="p" id='p5' type="text" size="50" placeholder="yy-mm-dd">
  </div>

  <div>
    <button id="btn2">Reset</button>
  </div>
  <div>
    <button id="btn1">Save Books</button>
  </div>
  </div>`;

async function getBookId(bookid1) {
  let bookid = bookid1;
  console.log(bookid);
  //eLibrary('addnewbooks');

  document.getElementById("changepage").innerHTML = addNewBookForm;

  let res = await fetch(
    `https://elibraryrestapi.herokuapp.com/elibrary/api/book/get/${bookid}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  );
  res = await res.json();
  console.log(res);

  document.getElementById("p1").value = res.title;
  document.getElementById("p2").value = res.isbn;
  document.getElementById("p3").value = res.overdueFee;
  document.getElementById("p4").value = res.publisher;
  document.getElementById("p5").value = res.datePublished;

  //adding event listener for the save book button
  let btnsave = document.getElementById("btn1");
  btnsave.addEventListener("click", function(e) {
    bookPosts1(bookid);
  });
}

// adding a new book function to the list
async function bookPosts() {
  let booktitle = document.getElementById("p1").value;
  let isbn1 = parseInt(document.getElementById("p2").value);
  let fee = parseFloat(document.getElementById("p3").value);
  let publisher1 = document.getElementById("p4").value;
  let datepublished = document.getElementById("p5").value;

  let data = {
    title: `${booktitle}`,
    isbn: `${isbn1}`,
    overdueFee: `${fee}`,
    publisher: `${publisher1}`,
    datePublished: `${datepublished}`
  };

  const res = await fetch(
    "https://elibraryrestapi.herokuapp.com/elibrary/api/book/add",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  );
  document.getElementById("p1").value = null;
  document.getElementById("p2").value = null;
  document.getElementById("p3").value = null;
  document.getElementById("p4").value = null;
  document.getElementById("p5").value = null;

  alert("succesfuly added to the list");
}

//updating a book properties
async function bookPosts1(bookId) {
  let booktitle = document.getElementById("p1").value;
  let isbn1 = parseInt(document.getElementById("p2").value);
  let fee = parseFloat(document.getElementById("p3").value);
  let publisher1 = document.getElementById("p4").value;
  let datepublished = document.getElementById("p5").value;

  let data = {
    title: `${booktitle}`,
    isbn: `${isbn1}`,
    overdueFee: `${fee}`,
    publisher: `${publisher1}`,
    datePublished: `${datepublished}`
  };

  const res = await fetch(
    `https://elibraryrestapi.herokuapp.com/elibrary/api/book/update/${bookId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  );
  document.getElementById("p1").value = null;
  document.getElementById("p2").value = null;
  document.getElementById("p3").value = null;
  document.getElementById("p4").value = null;
  document.getElementById("p5").value = null;

  alert("succesfuly added to the list");
}
