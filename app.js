(function () {
  const THEME_KEY = 'oss_theme_v1';
  const STORAGE_KEY = 'oss_todos_v1';

  /** @typedef {{ id: string, title: string, completed: boolean }} Todo */

  /** @returns {Todo[]} */
  function loadTodos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(Boolean);
    } catch {
      return [];
    }
  }

  /** @param {Todo[]} todos */
  function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  /** @param {string} title */
  function createTodo(title) {
    return { id: String(Date.now() + Math.random()), title, completed: false };
  }

  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

  const elements = {
    form: /** @type {HTMLFormElement} */ (qs('#todo-form')),
    input: /** @type {HTMLInputElement} */ (qs('#todo-input')),
    category: /** @type {HTMLSelectElement} */ (qs('#todo-category')),
    list: /** @type {HTMLUListElement} */ (qs('#todo-list')),
    clearBtn: /** @type {HTMLButtonElement} */ (qs('#clear-completed')),
    count: /** @type {HTMLSpanElement} */ (qs('#todo-count')),
    themeToggle: /** @type {HTMLButtonElement} */ (qs('#theme-toggle')),
  };

  let todos = loadTodos();

  function render() {
    elements.list.innerHTML = '';
    for (const todo of todos) {
      const li = document.createElement('li');
      li.dataset.id = todo.id;
      if (todo.completed) li.classList.add('completed');

      const label = document.createElement('label');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        saveTodos(todos);
        render();
      });

      const title = document.createElement('span');
      title.className = 'title';
      title.textContent = todo.title;

      const category = document.createElement('span');
      category.className = 'category-tag';
      category.textContent = todo.category;

      const del = document.createElement('button');
      del.className = 'delete-btn';
      del.setAttribute('aria-label', 'Delete todo');
      del.textContent = '×';
      del.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== todo.id);
        saveTodos(todos);
        render();
      });

      label.append(checkbox, title, category);
      li.append(label, del);
      elements.list.appendChild(li);
    }

    updateCount();
  }

  function updateCount() {
    const remaining = todos.filter(t => !t.completed).length;
    elements.count.textContent = `${remaining} remaining / ${todos.length} total`;
  }

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = elements.input.value.trim();
    const category = elements.category.value;
    if (!title) return;
    todos.push({ id: String(Date.now() + Math.random()), title, category, completed: false });
    elements.input.value = '';
    saveTodos(todos);
    render();
  });

  elements.clearBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveTodos(todos);
    render();
  });

  render();

  // Expose a tiny API for future contributions (e.g., unit tests in the browser)
  window.OSS = {
    getTodos: () => [...todos],
    addTodo: (title) => { todos.push(createTodo(String(title))); saveTodos(todos); render(); },
    clearCompleted: () => { todos = todos.filter(t => !t.completed); saveTodos(todos); render(); },
  };

  // ---- Theme toggle ----
  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
      elements.themeToggle.setAttribute('aria-pressed', 'false');
      elements.themeToggle.textContent = 'Light';
      // Adjust list item background for light
      // Using CSS vars for most, but list background was a fixed color; keep contrast acceptable.
    } else {
      root.classList.remove('light-theme');
      elements.themeToggle.setAttribute('aria-pressed', 'true');
      elements.themeToggle.textContent = 'Dark';
    }
  }

  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  elements.themeToggle.addEventListener('click', () => {
    const current = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
})();


