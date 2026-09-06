// ==========================================
// 1. NAVIGATION & TAB SWITCHING FUNCTION
// ==========================================
function switchTab(tabId) {
    // 1.1. ሁሉንም የገፅ ክፍሎች (Sections) መደበቅ
    const allSections = document.querySelectorAll('.page-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });

    // 1.2. ሁሉንም የናቪጌሽን ቁልፎች (Nav Items) Active አለማድረግ
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach(item => {
        item.classList.remove('active');
    });

    // 1.3. የተመረጠውን ገፅ (Section) ማሳየት
    const selectedSection = document.getElementById(tabId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // 1.4. የተጫኑትን ቁልፍ Active ማድረግ እና ወደ መሃል Scroll ማድረግ
    const clickedBtn = event.currentTarget;
    if (clickedBtn) {
        clickedBtn.classList.add('active');

        // ቁልፉ በጎን በኩል በሚሽከረከረው ባር ላይ በደንብ እንዲታይ መሃል የማድረግ ስራ
        clickedBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
}

// ==========================================
// 2. FORUM POSTING (ALL STUDENTS SECTION)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const postBtn = document.querySelector('.post-box .btn-primary');
    const postTextarea = document.querySelector('.post-box textarea');
    const feedList = document.querySelector('.feed-list');

    if (postBtn && postTextarea && feedList) {
        postBtn.addEventListener('click', () => {
            const content = postTextarea.value.trim();

            if (content === "") {
                alert("እባክዎን አስቀድመው መልእክት ይጻፉ!");
                return;
            }

            // አዲስ የፖስት ካርድ መፍጠር
            const newPost = document.createElement('div');
            newPost.classList.add('feed-card');
            newPost.innerHTML = `
                <div class="feed-user">
                    <div class="avatar-sm">ሳሚ</div>
                    <div>
                        <h4>ሳሙኤል (እርስዎ)</h4>
                        <span>አሁን የተለቀቀ • Student</span>
                    </div>
                </div>
                <p class="feed-text">${escapeHTML(content)}</p>
            `;

            // አዲሱን ፖስት ከላይ መጨመር
            feedList.prepend(newPost);

            // የጽሁፍ ሳጥኑን ባዶ ማድረግ
            postTextarea.value = "";
        });
    }

    // ==========================================
    // 3. EXAM SEARCH FILTER FUNCTIONALITY
    // ==========================================
    const searchExamBtn = document.querySelector('.filter-box .btn-primary');
    if (searchExamBtn) {
        searchExamBtn.addEventListener('click', () => {
            const uni = document.getElementById('uni-select').value;
            const year = document.getElementById('year-select').value;
            const dept = document.getElementById('exam-dept-select').value;

            if (!uni || !year || !dept) {
                alert("እባክዎን ዩኒቨርሲቲ፣ ዓመት እና ዲፓርትመንት ይምረጡ!");
                return;
            }

            alert(`የፈተና ፍለጋ በሂደት ላይ ነው...\nዩኒቨርሲቲ: ${uni}\nዓመት: ${year}ኛ ዓመት\nዲፓርትመንት: ${dept}`);
        });
    }
});

// Security helper function to avoid XSS attacks when posting text
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}