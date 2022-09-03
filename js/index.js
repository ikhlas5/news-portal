
const loadAllData = (categoriesSpinner, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data =>setMenu(data.data.news_category));
};
loadAllData();

const setMenu =(categories)=>{
    // console.log(categories);
    const allMenu = document.getElementById('all-menu');
    categories.forEach(category => {
        const menuDiv = document.createElement('ul');
        menuDiv.classList.add('menu');
        menuDiv.innerHTML=`
       
        <li ><a onclick="loadCardData('${category.category_id}'),processSearch() "  class="dropdown-item fw-semibold" href="#">${category.category_name}</a></li>

        `;
        allMenu.appendChild(menuDiv);
        
    });
  
};

const loadCardData = (categoryId) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayNews(data.data));
  
}

const displayNews = (cardNews)=>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
 // display no phones found
 const noNews = document.getElementById('no-found-message');
 if(cardNews.length === 0){
     noNews.classList.remove('d-none');
 }
 else{
     noNews.classList.add('d-none');
 }

    cardNews.forEach(card=>{
        const cardDiv = document.createElement('div');
        // cardDiv.classList.add('');
        cardDiv.innerHTML=`
        <div  class="card mb-3 border border-0 shadow rounded" style="max-width: 1200px;">
        <div  class="row g-0">
          <div class="col-md-4">
            <img src="${card.thumbnail_url}" class=" img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body pe-5">
              <h5 class="card-title">${card.title}</h5>
               <p class="card-text ">${card.details.length > 400 ? card.details.slice(0,400) + '...' : card.details }</p>
               <div class="d-flex justify-content-center  align-items-center">
               
               <img src="${card.author.img}" class=" me-3 rounded-pill" style="max-width: 5%;" alt="...">
               <h6>${card.author.name ? card.author.name : 'No Name Hare'}</h6>
              
               <h6 class="ms-5  "><i class="fa-solid fa-eye me-5">${card.total_view ? card.total_view:'No View'}</i></h6>
               <div class="d-flex align-items-center ms-5">
                <p><i class="fa-solid fa-star ms-3"></i></p>
                <p><i class="fa-solid fa-star ms-3"></i></p>
                <p><i class="fa-solid fa-star ms-3"></i></p>
                <p><i class="fa-solid fa-star-half-stroke ms-3"></i></p>
                <p><i class="fa-solid fa-star-half-stroke ms-3"></i></p>
              </div>
              <div class="d-flex align-items-center ms-5">
              <i onclick="loadDataDatails('${card._id}')" class="fa-solid fa-arrow-right ms-5 fs-3 " data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
              </div>
               </div>
               <p class="card-text ms-5"><small class="text-muted">${card.author.published_date}</small></p>
               <div class="d-flex" >
               
               </div>
            </div>
          </div>
        </div>
      </div>
        `;
        newsContainer.appendChild(cardDiv);
    });
       // stop spinner or loader
       toggleSpinner(false);
};

// start spiner
const processSearch = (dataLimit) =>{
  toggleSpinner(true);
  const categoriesSpinner= document.getElementById('all-menu');
  loadPhones(categoriesSpinner, dataLimit);
}

// spiner
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none')
  }
  else{
      loaderSection.classList.add('d-none');
  }
}

const loadDataDatails = (newsDatils) =>{
  const url = `https://openapi.programming-hero.com/api/news/${newsDatils}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>displayNewsDetails(data.data[0]))
}

const displayNewsDetails = (details)=>{
  // console.log(details);
  const modalTitle = document.getElementById('staticBackdropLabel');
  modalTitle.innerText=details.title;
  const newsDetails = document.getElementById('news-container');
  // newsDetails.textContent='';
  // console.log(details._id)
  newsDetails.innerHTML=`
 
  <img src="${details.thumbnail_url}" class ="news-writer img-fluid rounded-start" >
  <p class="fw-bold ms-3">${details.author.name ? details. author.name : 'no found'} </p>
  <p class="fw-bold ">Badge:${details.rating.badge}, <br><br> Number : ${details.rating.number}</p>
  <p class="fw-bold ">View:${details.total_view ? details.total_view : 'no view'}</p>

  `;
  

}
