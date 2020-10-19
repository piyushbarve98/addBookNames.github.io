

    



const list = document.querySelector('.list');

list.addEventListener('click',function(e){
    if(e.target.className=='delete'){
        const li = e.target.parentElement;
        li.parentNode.removeChild(li);
        //deleting from database
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Books').doc(id).delete();
    
    }
});
function renderBooks(doc){

    const value = document.querySelector('.search').value;
    document.querySelector('.search').value= null;
    const li = document.createElement('li');
    li.setAttribute('data-id',doc.id);
    const bookName = document.createElement('span');
    const del = document.createElement('span');

    bookName.textContent= doc.data().bookName;
    del.textContent = 'delete';

    //give class name to elements
    bookName.classList.add('name');
    del.classList.add('delete');

    //appending the elements to dom
    li.appendChild(bookName);
    li.appendChild(del);
    list.appendChild(li);



}

//add data to firestore database 
const form = document.querySelector('.book-add');

form.addEventListener('submit',function(e){
    e.preventDefault();
    // entry of database into the firestore database
    
    if(form.book.value!=''){
    db.collection('Books').add({
        bookName: form.book.value,
        
    });
}
    form.book.value='';


});


db.collection('Books').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change=> {
        if(change.type=='added'){
            renderBooks(change.doc);
        }  
       
    });
    

});
// javascript code for dark mode

const dark = document.querySelector('.dark');

dark.addEventListener('click',function(e){
    if(document.body.getAttribute('class')!='darkMode'){
        document.body.setAttribute('class','darkMode');
        dark.textContent='Dark Mode On';
        
    }
    else{
        document.body.removeAttribute('class');
        dark.textContent='Dark Mode'
    }
});
