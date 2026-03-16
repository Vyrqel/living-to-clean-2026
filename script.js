// Scroll reveal
      const reveals = document.querySelectorAll(".reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add("visible"), 80);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      reveals.forEach((el) => observer.observe(el));

      // Species filter
      function filterSpecies(filter, btn) {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        document.querySelectorAll(".sp-card").forEach((card) => {
          const k = card.dataset.kingdom;
          const m = card.dataset.mod;
          let show = false;
          if (filter === "all") show = true;
          else if (filter === "fungus") show = k === "fungus";
          else if (filter === "bacteria") show = k === "bacteria";
          else if (filter === "modified") show = m === "modified";
          else if (filter === "wildtype") show = m === "wildtype";
          card.style.display = show ? "" : "none";
        });
      }

      // Smooth nav active state
      const sections = document.querySelectorAll(
        "section[id], div.spec-banner-full"
      );
      const navLinks = document.querySelectorAll(".nav-links a");
      window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((s) => {
          if (window.scrollY >= s.offsetTop - 100) current = s.id;
        });
        navLinks.forEach((a) => {
          a.style.color =
            a.getAttribute("href") === "#" + current
              ? "var(--gl)"
              : "rgba(255,255,255,0.55)";
        });
      });
      
      function toggleNavLogo() {
  			if (window.innerWidth <= 700) {
          document.getElementById('navLogo').classList.toggle('flipped');
        }
      }
