function main() {
    const baseUrl = "https://web-server-book-dicoding.appspot.com";

    const getBook = async () => {
        // tuliskan kode di sini!
        // const xhr = new XMLHttpRequest();

        // xhr.onload = function(){
        //     const responseJson = JSON.parse(this.responseText);
        //     if(responseJson.error){
        //         showResponseMessage(responseJson.message)
        //     } else {
        //         renderAllBooks(responseJson.books);
        //     }
        // }

        // xhr.onerror = function(){
        //     showResponseMessage();
        // }

        // xhr.open("GET", `${baseUrl}/list`);
        // xhr.send();

        try{
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=id&apiKey=f2d84a9f0348417cb36028b1ef4680b8`);
            const responseJson = await response.json();
            renderAllBooks(responseJson.articles);
        } catch (error) {
            showResponseMessage(error);
        }
    };





    /*
        jangan ubah kode di bawah ini ya!
    */

    const renderAllBooks = (books) => {
        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = ``;
        
        books.forEach(book => {
            listBookElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>(${book.url}) ${book.title}</h5>
                            <p>${book.description}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = event.target.id;
                removeBook(bookId);
            })
        })
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        const inputBookId = document.querySelector("#inputBookId");
        const inputBookTitle = document.querySelector("#inputBookTitle");
        const inputBookAuthor = document.querySelector("#inputBookAuthor");
        const buttonSave = document.querySelector("#buttonSave");
        const buttonUpdate = document.querySelector("#buttonUpdate");

        buttonSave.addEventListener("click",     function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };
            insertBook(book)
        });

        buttonUpdate.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };

            updateBook(book)
        });
        getBook();
    });
}

export default main;