// Router object for navigation
const router = {
    currentMember: null,
    
    init: function() {
        this.renderHomepage();
        this.handleRoute();
        window.addEventListener('hashchange', () => this.handleRoute());
    },
    
    renderHomepage: function() {
        const membersList = document.getElementById('membersList');
        membersList.innerHTML = '';
        
        memberNames.forEach((memberId, index) => {
            const member = profiles[memberId];
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            memberCard.style.animationDelay = `${index * 0.1}s`;
            
            const fallbackImg = member.fallbackPicture || `https://ui-avatars.com/api/?name=${member.name}&size=150&background=8B0000&color=fff&bold=true`;
            memberCard.innerHTML = `
                <div class="member-avatar">
                    <img src="${member.profilePicture}" alt="${member.name}" onerror="this.onerror=null; this.src='${fallbackImg}';">
                </div>
                <h3 class="member-name">${member.name}</h3>
            `;
            
            memberCard.addEventListener('click', () => {
                window.location.hash = `#${memberId}`;
            });
            
            membersList.appendChild(memberCard);
        });
    },
    
    handleRoute: function() {
        const hash = window.location.hash.substring(1);
        
        if (hash && profiles[hash]) {
            this.showProfile(hash);
        } else {
            this.showHomepage();
        }
    },
    
    showHomepage: function() {
        document.getElementById('homepage').classList.add('active');
        document.getElementById('profilepage').classList.remove('active');
        this.currentMember = null;
    },
    
    showProfile: function(memberId) {
        document.getElementById('homepage').classList.remove('active');
        document.getElementById('profilepage').classList.add('active');
        
        this.currentMember = memberId;
        this.renderProfile(memberId);
    },
    
    renderProfile: function(memberId) {
        const member = profiles[memberId];
        const profileContent = document.getElementById('profileContent');
        
        if (!member) {
            profileContent.innerHTML = '<p>Member not found</p>';
            return;
        }
        
        const fallbackImg = member.fallbackPicture || `https://ui-avatars.com/api/?name=${member.name}&size=200&background=8B0000&color=fff&bold=true`;
        const characterInfo = member.character ? `<p class="character-name">${member.character}</p>` : '';
        
        profileContent.innerHTML = `
            <div class="profile-header">
                <div class="profile-image-container">
                    <img src="${member.profilePicture}" alt="${member.name}" class="profile-image" onerror="this.onerror=null; this.src='${fallbackImg}';">
                </div>
                <h1 class="profile-name">${member.name}</h1>
                ${characterInfo}
            </div>
            
            <div class="profile-details">
                <div class="profile-section">
                    <h2 class="section-heading">About</h2>
                    <p class="profile-description">${member.description}</p>
                </div>
                
                <div class="profile-section">
                    <h2 class="section-heading">Skills</h2>
                    <div class="skills-list">
                        ${member.skills.map(skill => `
                            <span class="skill-tag">${skill}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="profile-section">
                    <h2 class="section-heading">Strengths</h2>
                    <div class="strengths-list">
                        ${member.strengths.map(strength => `
                            <div class="strength-item">
                                <span class="strength-icon">⭐</span>
                                <span class="strength-text">${strength}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Animate profile on load
        setTimeout(() => {
            profileContent.classList.add('loaded');
        }, 10);
    },
    
    goHome: function() {
        window.location.hash = '';
        this.showHomepage();
    }
};

// Initialize router when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    router.init();
});
