/* JavaScript interaktif situs EduRancher Lab.
   File ini dipakai semua halaman. Yang nggak ada elemennya, fungsinya langsung skip. */

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  startClock();
  initContactForm();
  initQuiz();
  initDetailsTracker();
});

/* Nandain menu yang lagi dibuka. Cocokkan data-page di <body> sama data-nav di link. */
function setActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* Jam digital di navbar. Di-update tiap 1 detik, format Indonesia. */
function startClock() {
  const el = document.getElementById("live-clock");
  if (!el) return;
  const tick = () => {
    const now = new Date();
    el.textContent = now.toLocaleString("id-ID", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  tick();
  setInterval(tick, 1000);
}

/* Validasi form praktik. Kalau lolos, datanya disimpan di localStorage (simulasi aja). */
function initContactForm() {
  const form = document.getElementById("form-praktik");
  if (!form) return;

  const feedback = document.getElementById("form-feedback");
  const preview = document.getElementById("preview-data");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // jangan reload halaman

    const nama = form.nama.value.trim();
    const email = form.email.value.trim();
    const peran = form.peran.value;
    const topik = form.topik.value.trim();
    const setuju = form.setuju.checked;

    const errors = [];
    if (nama.length < 3) errors.push("Nama minimal 3 karakter.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Email tidak valid.");
    if (!peran) errors.push("Pilih peran lab Anda.");
    if (topik.length < 10) errors.push("Topik minat minimal 10 karakter.");
    if (!setuju) errors.push("Centang persetujuan sebelum mengirim.");

    if (errors.length) {
      feedback.className = "alert alert-danger show";
      feedback.innerHTML = "<strong>Periksa form:</strong><ul class='mb-0'>" +
        errors.map((e) => `<li>${e}</li>`).join("") + "</ul>";
      return;
    }

    const data = {
      nama,
      email,
      peran,
      pengalaman: [...form.querySelectorAll("input[name='pengalaman']:checked")].map((i) => i.value),
      topik,
      waktu: new Date().toISOString(),
    };

    localStorage.setItem("pendaftaranLabRancher", JSON.stringify(data));

    feedback.className = "alert alert-success show";
    feedback.textContent = "Pendaftaran tersimpan di browser (simulasi). Siap untuk sesi lab!";

    if (preview) {
      preview.classList.remove("d-none");
      preview.textContent = JSON.stringify(data, null, 2);
    }

    form.reset();
  });

  form.addEventListener("reset", () => {
    if (feedback) {
      feedback.className = "alert";
      feedback.classList.remove("show");
      feedback.textContent = "";
    }
  });
}

/* Kuis klik-pilih. Jawaban benar ada di data-answer. Setelah jawab, tombol reset bisa ulangi. */
function initQuiz() {
  const box = document.getElementById("quiz-box");
  if (!box) return;

  const answer = box.dataset.answer;
  const options = box.querySelectorAll(".quiz-option");
  const result = document.getElementById("quiz-result");
  const scoreBoard = document.getElementById("score-board");
  let answered = false;

  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      if (answered) return; // sekali jawab, jangan diganti
      answered = true;
      options.forEach((o) => o.classList.remove("is-selected"));
      opt.classList.add("is-selected");

      const correct = opt.dataset.value === answer;
      options.forEach((o) => {
        if (o.dataset.value === answer) o.classList.add("is-correct");
      });
      if (!correct) opt.classList.add("is-wrong");

      if (result) {
        result.className = correct ? "alert alert-success mt-3" : "alert alert-warning mt-3";
        result.textContent = correct
          ? "Benar! Master (control-plane) mengelola API server dan etcd."
          : "Belum tepat. Master/control-plane adalah otak cluster.";
      }
      if (scoreBoard) {
        scoreBoard.textContent = correct ? "Skor: 100/100" : "Skor: 0/100 — coba pelajari ulang arsitektur.";
      }
    });
  });

  const resetBtn = document.getElementById("quiz-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      answered = false;
      options.forEach((o) => o.classList.remove("is-selected", "is-correct", "is-wrong"));
      if (result) {
        result.className = "alert d-none";
        result.textContent = "";
      }
      if (scoreBoard) scoreBoard.textContent = "Skor: —";
    });
  }
}

/* Hitung berapa kali <details> dibuka di halaman konsep. */
function initDetailsTracker() {
  const counter = document.getElementById("spoiler-count");
  if (!counter) return;
  let opened = 0;
  document.querySelectorAll("details").forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open) opened += 1;
      counter.textContent = String(opened);
    });
  });
}
