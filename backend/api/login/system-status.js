const token = localStorage.getItem("token");

const response = await fetch("/api/system-status", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});