

const CREATE_POST_URL = "/api/post";

document.addEventListener("DOMContentLoaded", () => {
  const toggleFormBtn = document.getElementById("toggleFormBtn");
  const cancelFormBtn = document.getElementById("cancelFormBtn");
  const cancelFormBtn2 = document.getElementById("cancelFormBtn2");
  const formModalEl = document.getElementById("formModal");
  const formModal = new bootstrap.Modal(formModalEl);
  const postForm = document.getElementById("postForm");
  const formError = document.getElementById("formError");
  const postsContainer = document.getElementById("postsContainer");
  const postCardTemplate = document.getElementById("postCardTemplate");
  const noPostsMsg = document.getElementById("noPostsMsg");

  // Show / hide the form modal
  toggleFormBtn.addEventListener("click", () => {
    formModal.show();
    setTimeout(() => document.getElementById("companyName").focus(), 300);
  });

  cancelFormBtn.addEventListener("click", () => {
    postForm.reset();
    hideError();
    formModal.hide();
  });

  cancelFormBtn2.addEventListener("click", () => {
    postForm.reset();
    hideError();
  });

  // Submit the form
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    const payload = {
      companyName: document.getElementById("companyName").value.trim(),
      departmentName: document.getElementById("departmentName").value.trim(),
      refrenceEmployee: Number(document.getElementById("refrenceEmployee").value),
      totalEmployee: Number(document.getElementById("totalEmployee").value),
    };

    const submitBtn = postForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Saving...";

    try {
      const res = await fetch(CREATE_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      const newPost = data.post; // backend returns { message, post }

      addPostCard(newPost);
      postForm.reset();
      formModal.hide();
    } catch (err) {
      console.error(err);
      showError("Could not save the post. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Save Post";
    }
  });

  function addPostCard(post) {
    if (noPostsMsg) noPostsMsg.remove();

    const node = postCardTemplate.content.cloneNode(true);
    node.querySelector('[data-field="companyName"]').textContent = post.companyName ?? "";
    node.querySelector('[data-field="departmentName"]').textContent = post.departmentName ?? "";
    node.querySelector('[data-field="refrenceEmployee"]').textContent = post.refrenceEmployee ?? "";
    node.querySelector('[data-field="totalEmployee"]').textContent = post.totalEmployee ?? "";

    // Newest post first
    postsContainer.prepend(node);
  }

  function showError(msg) {
    formError.textContent = msg;
    formError.classList.remove("d-none");
  }

  function hideError() {
    formError.textContent = "";
    formError.classList.add("d-none");
  }
});

