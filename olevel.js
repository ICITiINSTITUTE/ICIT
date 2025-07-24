document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('oLevelApplicationForm');

    // Section 1 Elements
    const appliedAsRadios = document.querySelectorAll('input[name="appliedAs"]');
    const experienceYearsField = document.getElementById('experienceYears');

    // Section 3 Elements
    const mobileField = document.getElementById('mobile');
    const emailField = document.getElementById('email');

    // Section 4 Elements (Permanent Address)
    const permStateSelect = document.getElementById('permState');
    const permDistrictSelect = document.getElementById('permDistrict');
    const permPincodeField = document.getElementById('permPincode');

    // Section 5 Elements (Correspondence Address)
    const sameAsPermanentCheckbox = document.getElementById('sameAsPermanent');
    const corrAddressFields = document.getElementById('correspondenceAddressFields');
    const corrAddress1 = document.getElementById('corrAddress1');
    const corrAddress2 = document.getElementById('corrAddress2');
    const corrAddress3 = document.getElementById('corrAddress3');
    const corrCity = document.getElementById('corrCity');
    const corrStateSelect = document.getElementById('corrState');
    const corrDistrictSelect = document.getElementById('corrDistrict');
    const corrPincode = document.getElementById('corrPincode');

    // Section 7 Elements (Identification Details)
    const uploadPhoto = document.getElementById('uploadPhoto');
    const photoPreview = document.getElementById('photoPreview');
    const uploadSignature = document.getElementById('uploadSignature');
    const signaturePreview = document.getElementById('signaturePreview');
    const uploadThumbImpression = document.getElementById('uploadThumbImpression');
    const thumbPreview = document.getElementById('thumbPreview');
    const captchaDisplay = document.getElementById('captchaDisplay');
    const captchaInput = document.getElementById('captchaInput');

    const declarationCheckbox = document.getElementById('declaration');


    // --- Google Forms Submission URL and Entry IDs ---
    // !!! INHE APNE GOOGLE FORM KE ANUSAAR BADLEN !!!
    // !!! REPLACE THESE WITH YOUR GOOGLE FORM'S SUBMISSION URL AND ENTRY IDs !!!
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse'; // "formResponse" is important!
    const GOOGLE_ENTRY_IDS = {
        // Section 1
        onlineReference: 'entry.1234567890', // Example: Replace with actual ID
        registrationSought: 'entry.1122334455',
        appliedAs: 'entry.2233445566',
        examCycle: 'entry.3344556677',
        feePaidBy: 'entry.4455667788',

        // Section 2
        salutation: 'entry.5566778899',
        fullName: 'entry.6677889900',
        careOf: 'entry.7788990011',
        fatherSalutation: 'entry.8899001122',
        fatherName: 'entry.9900112233',
        motherSalutation: 'entry.0011223344',
        motherName: 'entry.1011121314',
        gender: 'entry.1415161718',
        dob: 'entry.1819202122',
        maritalStatus: 'entry.2223242526',
        category: 'entry.2627282930',
        handicapped: 'entry.3031323334',
        exServiceman: 'entry.3435363738',
        ews: 'entry.3839404142',
        religion: 'entry.4243444546',

        // Section 3
        phoneStdCode: 'entry.4647484950',
        phoneNumber: 'entry.5051525354',
        mobile: 'entry.5455565758',
        email: 'entry.5859606162',

        // Section 4 (Permanent Address)
        permAddress1: 'entry.6263646566',
        permAddress2: 'entry.6667686970',
        permAddress3: 'entry.7071727374',
        permCity: 'entry.7475767778',
        permState: 'entry.7879808182',
        permDistrict: 'entry.8283848586',
        permPincode: 'entry.8687888990',

        // Section 5 (Correspondence Address)
        sameAsPermanent: 'entry.9091929394', // For the checkbox status
        corrAddress1: 'entry.9495969798',
        corrAddress2: 'entry.9899000102',
        corrAddress3: 'entry.0203040506',
        corrCity: 'entry.0607080910',
        corrState: 'entry.1011121314a',
        corrDistrict: 'entry.1415161718b',
        corrPincode: 'entry.1819202122c',

        // Section 6
        highestQualification: 'entry.2223242526d',
        yearOfPassing: 'entry.2627282930e',
        experienceYears: 'entry.3031323334f',

        // Section 7
        aadharNumber: 'entry.3435363738g',
        apaarId: 'entry.3839404142h',
        // File uploads are tricky with direct Google Forms. You might send only filenames or separate upload.
        // For simplicity, we'll just acknowledge their presence or send dummy values if needed.
        photoFilename: 'entry.4243444546i', // Example for filename
        signatureFilename: 'entry.4647484950j',
        thumbImpressionFilename: 'entry.5051525354k',
        distinguishingMark: 'entry.5455565758l',
        captchaInput: 'entry.5859606162m',

        // Section 8
        declaration: 'entry.6263646566n' // For checkbox status
    };


    // --- Data for dependent dropdowns (States and Districts of India) ---
    // This is a comprehensive list, you can trim it if needed.
    const statesAndDistricts = {
        "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
        "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
        "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
        "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup Rural", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
        "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur (Bhabua)", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
        "Chandigarh": ["Chandigarh"],
        "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurella-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kanker", "Kawardha", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
        "Dadra and Nagar Haveli": ["Dadra & Nagar Haveli"],
        "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
        "Daman and Diu": ["Daman", "Diu"],
        "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
        "Goa": ["North Goa", "South Goa"],
        "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Valsad", "Vadodara"],
        "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
        "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
        "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
        "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"],
        "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
        "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
        "Lakshadweep": ["Lakshadweep"],
        "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
        "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
        "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
        "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ribhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
        "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", 
        "Saitual", "Sinlung Hills"],
        "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto", "Noklak"],
        "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
        "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"],
        "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"],
        "Rajasthan": ["Ajmer", "Alwar", "Balotra", "Banswara", "Baran", "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Deeg", "Dholpur", "Didwana Kuchaman", "Dudu", "Dungarpur", "Ganganagar", "Gangapur City", "Hanumangarh", "Jaipur", "Jaipur Rural", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Jodhpur Rural", "Karauli", "Kekri", "Khairthal-Tijara", "Kota", "Kotputli-Behror", "Nagaur", "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar", "Sanchore", "Sawai Madhopur", "Shahpura", "Sikar", "Sirohi", "Tonk", "Udaipur"],
        "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
        "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
        "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
        "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", 
        "Unakoti", "West Tripura"],
        "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Bara Banki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
        "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
        "West Bengal": ["Alipurduar", "Bankura", "Paschim Bardhaman", "Purba Bardhaman", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
    };


    // --- Helper Functions ---

    function populateStates(selectElement) {
        selectElement.innerHTML = '<option value="">--Select One--</option>';
        Object.keys(statesAndDistricts).sort().forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            selectElement.appendChild(option);
        });
    }

    function populateDistricts(stateSelectElement, districtSelectElement) {
        const selectedState = stateSelectElement.value;
        districtSelectElement.innerHTML = '<option value="">--Select One--</option>'; // Clear previous options
        districtSelectElement.disabled = true; // Disable until a state is selected

        if (selectedState && statesAndDistricts[selectedState]) {
            statesAndDistricts[selectedState].sort().forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelectElement.appendChild(option);
            });
            districtSelectElement.disabled = false; // Enable if state has districts
        }
    }

    let generatedCaptcha = '';
    function generateCaptcha() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        generatedCaptcha = '';
        for (let i = 0; i < 6; i++) { // 6-character captcha
            generatedCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        captchaDisplay.textContent = generatedCaptcha;
    }

    function setupImagePreview(inputFileElement, previewElement) {
        inputFileElement.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewElement.style.backgroundImage = `url('${e.target.result}')`;
                    previewElement.textContent = ''; // Clear "No image" text
                };
                reader.readAsDataURL(file);
            } else {
                previewElement.style.backgroundImage = 'none';
                previewElement.textContent = 'No Image Selected';
            }
        });
    }

    // --- Initializations and Event Listeners ---

    // Populate state dropdowns
    populateStates(permStateSelect);
    populateStates(corrStateSelect);

    // Dependent district dropdowns
    permStateSelect.addEventListener('change', () => populateDistricts(permStateSelect, permDistrictSelect));
    corrStateSelect.addEventListener('change', () => populateDistricts(corrStateSelect, corrDistrictSelect));

    // Initial CAPTCHA generation
    generateCaptcha();

    // Setup image previews
    setupImagePreview(uploadPhoto, photoPreview);
    setupImagePreview(uploadSignature, signaturePreview);
    setupImagePreview(uploadThumbImpression, thumbPreview);

    // Toggle experience field based on "Applied As"
    appliedAsRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'Direct Candidate') {
                experienceYearsField.closest('.form-group').style.display = 'block';
                experienceYearsField.setAttribute('required', 'required'); // Make it required for direct
            } else {
                experienceYearsField.closest('.form-group').style.display = 'none';
                experienceYearsField.removeAttribute('required');
                experienceYearsField.value = ''; // Clear value if hidden
            }
        });
    });
    // Initial check for default selected "Applied As"
    const defaultAppliedAs = document.querySelector('input[name="appliedAs"]:checked');
    if (defaultAppliedAs && defaultAppliedAs.value !== 'Direct Candidate') {
        experienceYearsField.closest('.form-group').style.display = 'none';
        experienceYearsField.removeAttribute('required');
    }


    // "Same as Permanent Address" checkbox logic
    sameAsPermanentCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        if (isChecked) {
            corrAddressFields.style.display = 'none';
            // Copy values from permanent address fields
            corrAddress1.value = document.getElementById('permAddress1').value;
            corrAddress2.value = document.getElementById('permAddress2').value;
            corrAddress3.value = document.getElementById('permAddress3').value;
            corrCity.value = document.getElementById('permCity').value;
            corrPincode.value = document.getElementById('permPincode').value;

            // Copy state and trigger district population
            corrStateSelect.value = document.getElementById('permState').value;
            populateDistricts(corrStateSelect, corrDistrictSelect);
            corrDistrictSelect.value = document.getElementById('permDistrict').value;

            // Remove required attribute from correspondence fields
            corrAddress1.removeAttribute('required');
            corrAddress2.removeAttribute('required');
            corrCity.removeAttribute('required');
            corrStateSelect.removeAttribute('required');
            corrDistrictSelect.removeAttribute('required');
            corrPincode.removeAttribute('required');


        } else {
            corrAddressFields.style.display = 'block';
            // Clear values and add required attribute back
            corrAddress1.value = ''; corrAddress1.setAttribute('required', 'required');
            corrAddress2.value = ''; corrAddress2.setAttribute('required', 'required');
            corrAddress3.value = '';
            corrCity.value = ''; corrCity.setAttribute('required', 'required');
            corrStateSelect.value = ''; corrStateSelect.setAttribute('required', 'required');
            corrDistrictSelect.value = ''; corrDistrictSelect.setAttribute('required', 'required');
            corrPincode.value = ''; corrPincode.setAttribute('required', 'required');
            populateDistricts(corrStateSelect, corrDistrictSelect); // Reset districts
        }
    });

    // --- Client-Side Validation and Google Forms Submission ---
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Clear previous error messages and error states
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));

        const requiredFields = form.querySelectorAll('[required]');

        // Generic required field validation
        requiredFields.forEach(field => {
            // Handle radio button groups
            if (field.type === 'radio') {
                const fieldName = field.name;
                const checkedInputs = form.querySelectorAll(`input[name="${fieldName}"]:checked`);
                if (checkedInputs.length === 0) {
                    isValid = false;
                    const parentGroup = field.closest('.form-group');
                    if (parentGroup) {
                        parentGroup.classList.add('error');
                        let errorMessage = parentGroup.querySelector('.error-message');
                        if (!errorMessage) {
                            errorMessage = document.createElement('div');
                            errorMessage.className = 'error-message';
                            parentGroup.appendChild(errorMessage);
                        }
                        errorMessage.textContent = 'This field is mandatory.';
                        errorMessage.style.display = 'block';
                    }
                }
            }
            // Handle select-one (dropdowns)
            else if (field.tagName === 'SELECT' && field.value === '') {
                isValid = false;
                const parentGroup = field.closest('.form-group');
                if (parentGroup) {
                    parentGroup.classList.add('error');
                    let errorMessage = parentGroup.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        parentGroup.appendChild(errorMessage);
                    }
                    errorMessage.textContent = 'This field is mandatory.';
                    errorMessage.style.display = 'block';
                }
            }
            // Handle file inputs
            else if (field.type === 'file') {
                if (field.files.length === 0) {
                    isValid = false;
                    const parentGroup = field.closest('.form-group');
                    if (parentGroup) {
                        parentGroup.classList.add('error');
                        let errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Please upload a file.';
                        parentGroup.appendChild(errorMessage);
                    }
                } else {
                    const file = field.files[0];
                    const fileSize = file.size / 1024; // in KB
                    const fileType = file.type;
                    const allowedTypes = ['image/jpeg', 'image/gif', 'image/png'];

                    if (fileSize > 50) { // Max 50 KB
                        isValid = false;
                        const parentGroup = field.closest('.form-group');
                        parentGroup.classList.add('error');
                        let errorMessage = parentGroup.querySelector('.error-message');
                        if (!errorMessage) {
                            errorMessage = document.createElement('div');
                            errorMessage.className = 'error-message';
                            parentGroup.appendChild(errorMessage);
                        }
                        errorMessage.textContent = 'File size must be upto 50 KB.';
                        errorMessage.style.display = 'block';
                    } else if (!allowedTypes.includes(fileType)) {
                        isValid = false;
                        const parentGroup = field.closest('.form-group');
                        parentGroup.classList.add('error');
                        let errorMessage = parentGroup.querySelector('.error-message');
                        if (!errorMessage) {
                            errorMessage = document.createElement('div');
                            errorMessage.className = 'error-message';
                            parentGroup.appendChild(errorMessage);
                        }
                        errorMessage.textContent = 'Only JPG, JPEG, GIF, PNG images are allowed.';
                        errorMessage.style.display = 'block';
                    }
                }
            }
            // Handle text, email, tel, number, textarea (non-file, non-radio, non-select)
            else if (field.value.trim() === '') {
                isValid = false;
                const parentGroup = field.closest('.form-group');
                if (parentGroup) {
                    parentGroup.classList.add('error');
                    let errorMessage = parentGroup.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        parentGroup.appendChild(errorMessage);
                    }
                    errorMessage.textContent = 'This field is mandatory.';
                    errorMessage.style.display = 'block';
                }
            }
        });

        // Specific field validations
        // Email validation
        if (emailField && emailField.value.trim() !== '' && !emailField.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
            isValid = false;
            const parentGroup = emailField.closest('.form-group');
            parentGroup.classList.add('error');
            let errorMessage = parentGroup.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                parentGroup.appendChild(errorMessage);
            }
            errorMessage.textContent = 'Please enter a valid email address.';
            errorMessage.style.display = 'block';
        }

        // Mobile number validation (10 digits)
        if (mobileField && mobileField.value.trim() !== '' && !mobileField.value.match(/^\d{10}$/)) {
            isValid = false;
            const parentGroup = mobileField.closest('.form-group');
            parentGroup.classList.add('error');
            let errorMessage = parentGroup.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                parentGroup.appendChild(errorMessage);
            }
            errorMessage.textContent = 'Please enter a 10-digit mobile number.';
            errorMessage.style.display = 'block';
        }

        // Pin Code validation (6 digits)
        if (permPincodeField && permPincodeField.value.trim() !== '' && !permPincodeField.value.match(/^\d{6}$/)) {
            isValid = false;
            const parentGroup = permPincodeField.closest('.form-group');
            parentGroup.classList.add('error');
            let errorMessage = parentGroup.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                parentGroup.appendChild(errorMessage);
            }
            errorMessage.textContent = 'Please enter a 6-digit PIN code.';
            errorMessage.style.display = 'block';
        }

        // Correspondence Pin Code validation (if not same as permanent)
        if (!sameAsPermanentCheckbox.checked && corrPincode && corrPincode.value.trim() !== '' && !corrPincode.value.match(/^\d{6}$/)) {
             isValid = false;
            const parentGroup = corrPincode.closest('.form-group');
            parentGroup.classList.add('error');
            let errorMessage = parentGroup.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                parentGroup.appendChild(errorMessage);
            }
            errorMessage.textContent = 'Please enter a 6-digit PIN code.';
            errorMessage.style.display = 'block';
        }


        // CAPTCHA validation
        if (captchaInput.value.trim().toLowerCase() !== generatedCaptcha.toLowerCase()) {
            isValid = false;
            const parentGroup = captchaInput.closest('.form-group');
            parentGroup.classList.add('error');
            let errorMessage = parentGroup.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                parentGroup.appendChild(errorMessage);
            }
            errorMessage.textContent = 'Incorrect CAPTCHA. Please try again.';
            errorMessage.style.display = 'block';
            generateCaptcha(); // Regenerate CAPTCHA on failure
            captchaInput.value = ''; // Clear CAPTCHA input
        }

        // Declaration checkbox validation
        if (!declarationCheckbox.checked) {
            isValid = false;
            const parentGroup = declarationCheckbox.closest('.form-group');
            parentGroup.classList.add('error');
            let errorMessage = parentGroup.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                parentGroup.appendChild(errorMessage);
            }
            errorMessage.textContent = 'You must agree to the declaration.';
            errorMessage.style.display = 'block';
        }


        if (!isValid) {
            alert('Please fill in all mandatory fields and correct errors.');
            // Scroll to the first error field
            const firstErrorField = document.querySelector('.form-group.error input, .form-group.error select, .form-group.error textarea, .form-group.error .radio-group, .form-group.error .checkbox-group');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return; // Stop function execution if validation fails
        }

        // --- Prepare data for Google Forms ---
        const googleFormData = new FormData();

        // Section 1
        googleFormData.append(GOOGLE_ENTRY_IDS.onlineReference, document.querySelector('input[name="onlineReference"]:checked')?.value || '');
        googleFormData.append(GOOGLE_ENTRY_IDS.registrationSought, document.getElementById('registrationSought').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.appliedAs, document.querySelector('input[name="appliedAs"]:checked')?.value || '');
        googleFormData.append(GOOGLE_ENTRY_IDS.examCycle, document.getElementById('examCycle').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.feePaidBy, document.querySelector('input[name="feePaidBy"]:checked')?.value || '');

        // Section 2
        googleFormData.append(GOOGLE_ENTRY_IDS.salutation, document.getElementById('salutation').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.fullName, document.getElementById('fullName').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.careOf, document.querySelector('input[name="careOf"]:checked')?.value || '');
        googleFormData.append(GOOGLE_ENTRY_IDS.fatherSalutation, document.getElementById('fatherSalutation').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.fatherName, document.getElementById('fatherName').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.motherSalutation, document.getElementById('motherSalutation').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.motherName, document.getElementById('motherName').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.gender, document.getElementById('gender').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.dob, document.getElementById('dob').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.maritalStatus, document.getElementById('maritalStatus').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.category, document.getElementById('category').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.handicapped, document.querySelector('input[name="handicapped"]:checked')?.value || '');
        googleFormData.append(GOOGLE_ENTRY_IDS.exServiceman, document.querySelector('input[name="exServiceman"]:checked')?.value || '');
        googleFormData.append(GOOGLE_ENTRY_IDS.ews, document.querySelector('input[name="ews"]:checked')?.value || '');
        googleFormData.append(GOOGLE_ENTRY_IDS.religion, document.getElementById('religion').value);

        // Section 3
        googleFormData.append(GOOGLE_ENTRY_IDS.phoneStdCode, document.getElementById('phoneStdCode').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.phoneNumber, document.getElementById('phoneNumber').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.mobile, mobileField.value);
        googleFormData.append(GOOGLE_ENTRY_IDS.email, emailField.value);

        // Section 4 (Permanent Address)
        googleFormData.append(GOOGLE_ENTRY_IDS.permAddress1, document.getElementById('permAddress1').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.permAddress2, document.getElementById('permAddress2').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.permAddress3, document.getElementById('permAddress3').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.permCity, document.getElementById('permCity').value);
        googleFormData.append(GOOGLE_ENTRY_IDS.permState, permStateSelect.value);
        googleFormData.append(GOOGLE_ENTRY_IDS.permDistrict, permDistrictSelect.value);
        googleFormData.append(GOOGLE_ENTRY_IDS.permPincode, permPinc