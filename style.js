const quizData = [
    {
      question: "Who was born in Vaishali?",
      options: ["Gautama Buddha", "Lord Mahavira", "Ashoka", "Chanakya"],
      answer: "Lord Mahavira"
    },
    {
      question: "What important Buddhist event happened in Vaishali?",
      options: ["Buddha was born", "Buddha achieved enlightenment", "Buddha gave his last sermon", "Buddha died"],
      answer: "Buddha gave his last sermon"
    },
    {
      question: "What is Abhishek Pushkarni?",
      options: ["A temple", "A coronation tank", "A university", "A fort"],
      answer: "A coronation tank"
    },
    {
      question: "Which pillar is found in Vaishali?",
      options: ["Qutub Minar", "Ashokan Pillar", "Iron Pillar", "Victory Pillar"],
      answer: "Ashokan Pillar"
    },
    {
      question: "Which ancient republic was based in Vaishali?",
      options: ["Maurya", "Gupta", "Lichchhavi", "Mughal"],
      answer: "Lichchhavi"
    },
    {
      question: "Best time to visit Vaishali?",
      options: ["March to June", "April to July", "October to March", "June to September"],
      answer: "October to March"
    },
    {
      question: "Nearest airport to Vaishali?",
      options: ["Gaya", "Patna", "Rajgir", "Muzaffarpur"],
      answer: "Patna"
    },
    {
      question: "Which Buddhist structure is found in Vaishali?",
      options: ["Golden Temple", "Buddha Stupa I & II", "Mahabodhi Temple", "Sanchi Stupa"],
      answer: "Buddha Stupa I & II"
    },
    {
      question: "Where is Vaishali Museum located?",
      options: ["Patna", "Hajipur", "Vaishali", "Nalanda"],
      answer: "Vaishali"
    },
    {
      question: "What’s a nearby homestay in Hajipur?",
      options: ["Patliputra Homestay", "Buddha Residency", "Nalanda Guest House", "Lichchhavi Inn"],
      answer: "Buddha Residency"
    }
  ];
  
  
  let currentQ = 0;
  let userAnswers = [];
  
  const quizBox = document.getElementById('quiz-box');
  const resultBox = document.getElementById('result');
  const backBtn = document.getElementById('backBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  function loadQuestion(index) {
    const q = quizData[index];
    quizBox.innerHTML = `
      <div class="question">${index + 1}. ${q.question}</div>
      <div class="options">
        ${q.options.map(option => `
          <label>
            <input type="radio" name="answer" value="${option}" ${userAnswers[index] === option ? 'checked' : ''}/>
            ${option}
          </label>
        `).join('')}
      </div>
    `;
    resultBox.innerHTML = "";
  }
  
  function showResult() {
    let score = 0;
    let output = "<h3>🎯 Result:</h3><ul>";
    quizData.forEach((q, i) => {
      const userAns = userAnswers[i];
      const isCorrect = userAns === q.answer;
      if (isCorrect) score++;
      output += `<li>
        <strong>Q${i + 1}: ${q.question}</strong><br/>
        Your answer: <span class="${isCorrect ? 'correct' : 'incorrect'}">${userAns || 'Not answered'}</span><br/>
        Correct answer: <span class="correct">${q.answer}</span>
      </li><br/>`;
    });
    output += `</ul><h3>✅ Score: ${score} / ${quizData.length}</h3>`;
    resultBox.innerHTML = output;
  }
  
  nextBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
      userAnswers[currentQ] = selected.value;
    }
    if (currentQ < quizData.length - 1) {
      currentQ++;
      loadQuestion(currentQ);
    } else {
      showResult();
    }
  });
  
  backBtn.addEventListener('click', () => {
    if (currentQ > 0) {
      currentQ--;
      loadQuestion(currentQ);
    }
  });
  
  loadQuestion(currentQ);
  
  // -------------- Comments Section --------------
  
  const commentForm = document.getElementById("commentForm");
  const commentList = document.getElementById("commentList");
  
  // Load saved comments from localStorage
  function loadComments() {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    commentList.innerHTML = "";
    savedComments.forEach((comment, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${comment.name}</strong><br/>
        ${comment.message}
        <button class="comment-delete-btn" data-index="${index}">Delete</button>
      `;
      commentList.appendChild(li);
    });
  
    // Attach delete event listeners after rendering
    const deleteButtons = document.querySelectorAll(".comment-delete-btn");
    deleteButtons.forEach(btn => {
      btn.addEventListener("click", function() {
        const idx = this.getAttribute("data-index");
        deleteComment(idx);
      });
    });
  }
  
  function deleteComment(index) {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    loadComments();
  }
  
  // Handle form submit
  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
  
    if (name && message) {
      const newComment = { name, message };
      const existing = JSON.parse(localStorage.getItem("comments")) || [];
      existing.push(newComment);
      localStorage.setItem("comments", JSON.stringify(existing));
      loadComments();
      commentForm.reset();
    }
  });
  
  loadComments();