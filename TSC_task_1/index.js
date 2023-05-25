(() => {
  const tableBody = document.getElementById("postsBody");
  const paginationDiv = document.getElementById("pagination");
  const pageSize = 10;
  const dictionary = {
    error: {
      getData: "Problem with getting data",
      something: "Something was wrong :(",
      empty: "Empty!",
    },
  };

  let isLoading = false;
  let postsData = [];

  async function fetchData() {
    try {
      isLoading = true;
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (!response.ok) {
        throw new Error(dictionary.error.getData);
      }

      const data = await response.json();
      postsData = data.sort((a, b) => a.title.localeCompare(b.title));

      localStorage.setItem("postsData", JSON.stringify(postsData));

      return postsData;
    } catch (error) {
      console.error(error);
      tableBody.innerHTML = `<div>${dictionary.error.getData}</div>`;
    } finally {
      isLoading = false;
    }
  }

  async function initialize() {
    try {
      const data = await fetchData();
      if (data) {
        const currentPage = 1;
        const paginatedData = createPagination(data, currentPage, pageSize);

        renderTable(paginatedData);
        renderPagination(currentPage, Math.ceil(data.length / pageSize));
      }
    } catch {
      tableBody.innerHTML = `<div>${dictionary.error.something}</div>`;
    }
  }

  function createPagination(data, page, pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    return data.slice(startIndex, endIndex);
  }

  function renderTable(data) {
    tableBody.innerHTML = "";

    if (!data.length) {
      tableBody.innerHTML = `<div>${dictionary.error.empty}</div>`;
      return;
    }

    data.forEach((post) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.body}</td>
      `;

      tableBody.appendChild(row);
    });
  }

  function handlePageChange(currentPage) {
    const paginatedData = createPagination(postsData, currentPage, pageSize);

    renderTable(paginatedData);
    renderPagination(currentPage, Math.ceil(postsData.length / pageSize));
  }

  function renderPagination(currentPage, totalPages) {
    paginationDiv.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");

      button.textContent = i;
      button.disabled = i === currentPage;

      button.addEventListener("click", () => handlePageChange(i));

      paginationDiv.appendChild(button);
    }
  }

  initialize();
})();
