// Simple client-side demo data and filtering for SDG8 match prototype
(function(){
  const candidates = [
    {name:'Amina K.', skills:['web','design'], location:'Nairobi', availability:'Immediate', role:'Junior Web Designer'},
    {name:'David O.', skills:['data'], location:'Lagos', availability:'2 months', role:'Data Analyst'},
    {name:'Fatima S.', skills:['sales'], location:'Accra', availability:'Immediate', role:'Sales Associate'},
    {name:'Samuel N.', skills:['web','data'], location:'Nairobi', availability:'1 month', role:'Frontend Developer'},
    {name:'Grace T.', skills:['design'], location:'Kigali', availability:'Immediate', role:'UI/UX Designer'}
  ];

  const elems = {
    skill: document.getElementById('skillFilter'),
    location: document.getElementById('locationFilter'),
    apply: document.getElementById('applyFilter'),
    reset: document.getElementById('resetFilter'),
    list: document.getElementById('candidates')
  };

  function render(list){
    elems.list.innerHTML = '';
    if(!list.length){
      elems.list.innerHTML = '<p>No candidates match the filters.</p>';
      return;
    }
    list.forEach(c=>{
      const card = document.createElement('div');
      card.className = 'candidate-card';
      card.innerHTML = `
        <h4>${c.name}</h4>
        <div class="badges">${c.skills.map(s=>`<span class="badge">${skillLabel(s)}</span>`).join('')}</div>
        <p class="muted">${c.role} — ${c.location}</p>
        <p>Availability: ${c.availability}</p>
      `;
      elems.list.appendChild(card);
    });
  }

  function skillLabel(key){
    return {
      web: 'Web Dev',
      data: 'Data',
      design: 'Design',
      sales: 'Sales'
    }[key]||key;
  }

  function applyFilter(){
    const skill = elems.skill.value;
    const loc = elems.location.value.trim().toLowerCase();
    const filtered = candidates.filter(c=>{
      const skillOK = !skill || c.skills.includes(skill);
      const locOK = !loc || c.location.toLowerCase().includes(loc);
      return skillOK && locOK;
    });
    render(filtered);
  }

  elems.apply.addEventListener('click', applyFilter);
  elems.reset.addEventListener('click', function(){
    elems.skill.value = '';
    elems.location.value = '';
    render(candidates);
  });

  // initial render
  render(candidates);
})();
