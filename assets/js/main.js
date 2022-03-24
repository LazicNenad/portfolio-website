getSkills().then((data) => {
   let frontArray = data.filter((x) => x.category == "front");
   let backArray = data.filter((x) => x.category == "back");
   let extraArray = data.filter((x) => x.category == "extra");
   let html = "";
   frontArray.forEach((skill) => {
      html += skillDiv(skill);
      document.getElementById("front").innerHTML = html;
   });
   html = "";
   backArray.forEach((skill) => {
      html += skillDiv(skill);
      document.getElementById("back").innerHTML = html;
   });
   html = "";

   extraArray.forEach((skill) => {
      html += skillDiv(skill);
      document.getElementById("extra").innerHTML = html;
   });
});

numberOfProjects().then((data) => {
   let projectsLenght = Object.keys(data).length;
   var pagination = document.getElementById("pagination");
   var perPage = 2;

   for (let i = 0; i < Math.ceil(projectsLenght / perPage); i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      li.classList.add("page-item");
      a.appendChild(document.createTextNode(i + 1));
      a.setAttribute("href", "#");
      a.classList.add("page-link");
      a.setAttribute("from", i * perPage);
      a.setAttribute("to", i * perPage + perPage);
      li.appendChild(a);
      pagination.appendChild(li);
   }

   var paginationLinks = document.querySelectorAll(".page-link");
   paginationLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
         e.preventDefault();
         getProjects().then((data) => {
            printProjects(
               e.target.getAttribute("from"),
               e.target.getAttribute("to"),
               data
            );
         });
      });
   });
});

getProjects().then((data) => {
   printProjects(0, 2, data);
});

async function getSkills() {
   const data = await fetch("assets/data/skills.json");

   return await data.json();
}

function skillDiv(skill) {
   return `
	<div
		class="col-12 d-flex py-3 justify-content-between align-items-center m-auto"
		style="width: 70%"
		>
		<img
			src="assets/img/${skill.imagePath}"
			alt="${skill.name}"
			style="width: 4em"
		/>
		<h3>${skill.name}</h3>
	</div>
	`;
}

async function getProjects() {
   const data = await fetch("assets/data/projects.json");

   return await data.json();
}

async function numberOfProjects() {
   const data = await fetch("assets/data/projects.json");

   return await data.json();
}

function printProjects(from, to, data) {
   let html = "";
   data.slice(from, to).forEach((project) => {
      html += `
      <div class="col-sm-12 col-md-6 projects my-3">
                  <div class="card" style="width: 32rem">
                  <a href="${project.linkProject}" target="_blank">
                     <img
                        src="assets/img/projects/${project.image}"
                        class="card-img-top"
                        alt="..."
                     />
                  </a>
                     <div class="card-body">
                        <h5 class="card-title fw-bold">${project.title}</h5>
                        <p class="card-text text-start">
                           ${project.description}
                        </p>
                     </div>
                     <ul class="list-group list-group-flush text-start">
                        <li class="list-group-item fw-bold">Technologies used:       
      `;
      for (let obj of project.technologies) {
         html += `
         <li class="list-group-item ">${obj} </li>
         `;
      }
      html += `
      </li>  
      </ul>
      <div class="card-body">
                        <a href="${project.linkProject}" class="card-link btn btn-primary"
                           ><i class="fa-solid fa-eye pe-2"></i>Project</a
                        >
                        <a href="${project.linkGithub}" class="card-link btn btn-info"
                           ><i class="fa-brands fa-github pe-2"></i>Github</a
                        >
                     </div>
                  </div>
               </div>
      `;
   });
   html += ``;
   document.getElementById("projects").innerHTML = html;
}
