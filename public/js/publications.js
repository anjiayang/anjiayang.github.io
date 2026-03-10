// Publications page search and filtering
(function () {
  'use strict'

  function initializeSearch() {
    const container = document.querySelector('.publications-container')
    const searchInput = document.getElementById('pubSearch')
    const filterBtns = Array.from(document.querySelectorAll('.filter-btn'))

    if (!container || !searchInput || !filterBtns.length) {
      return
    }

    const papers = Array.from(container.querySelectorAll('li')).filter((item) =>
      item.querySelector('.pub-type'),
    )
    const statNumbers = Array.from(container.querySelectorAll('.stat-number'))

    if (!papers.length) {
      return
    }

    papers.forEach((paper) => {
      const typeEl = paper.querySelector('.pub-type')
      if (typeEl) {
        const typeText = typeEl.textContent.toLowerCase()
        if (typeText.includes('journal')) paper.dataset.type = 'journal'
        else if (typeText.includes('conference')) paper.dataset.type = 'conference'
        else paper.dataset.type = 'book'
      }

    })

    function updateStats() {
      const counts = { journal: 0, conference: 0, book: 0 }

      papers.forEach((paper) => {
        if (paper.style.display !== 'none') {
          counts[paper.dataset.type] += 1
        }
      })

      if (statNumbers.length >= 3) {
        statNumbers[0].textContent = counts.journal
        statNumbers[1].textContent = counts.conference
        statNumbers[2].textContent = counts.book
      }
    }

    function getActiveFilter() {
      return container.querySelector('.filter-btn.active')?.dataset.filter || 'all'
    }

    function filterPapers() {
      const query = searchInput.value.toLowerCase().trim()
      const activeFilter = getActiveFilter()

      papers.forEach((paper) => {
        const text = paper.textContent.toLowerCase()
        const matchesQuery = !query || text.includes(query)
        const matchesType = activeFilter === 'all' || paper.dataset.type === activeFilter
        paper.style.display = matchesQuery && matchesType ? 'list-item' : 'none'
      })

      updateStats()
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((item) => item.classList.remove('active'))
        btn.classList.add('active')
        filterPapers()
      })
    })

    searchInput.addEventListener('input', filterPapers)
    filterPapers()
  }

  function initIfPublicationsPage() {
    if (window.location.hash.includes('publications')) {
      setTimeout(initializeSearch, 250)
    }
  }

  document.addEventListener('DOMContentLoaded', initIfPublicationsPage)
  window.addEventListener('hashchange', initIfPublicationsPage)
  setTimeout(initIfPublicationsPage, 1000)
})()
