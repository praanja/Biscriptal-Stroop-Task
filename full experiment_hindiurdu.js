//define the variables
var jsPsych = initJsPsych(
  {
  experiment_width: 1000,
  // default_iti: 500,
  on_finish: function() {
    jsPsych.data.getData('csv');
    data.condition = CONDITION;
      }
});
var timeline=[];
let user_condition = null;

//fullscreen
var fullscreen = {
  type: jsPsychFullscreen,
  message: `
    <div style="font-size:18pt; text-align:left; max-width:800px; margin:auto; text-align:center;">
      <p> Welcome to the experiment! <br>The experiment will now go into fullscreen mode. </p> 
      <p> प्रयोग में आपका स्वागत है! <br> यह प्रयोग अब पूर्ण स्क्रीन (फुलस्क्रीन) मोड में जाएगा।</p> 
      <p> تجربے میں خوش آمدید! <br> یہ تجربہ اب مکمل اسکرین موڈ میں چلے گا۔ </p> 
    </div> 
  `,
  button_label: "Continue / जारी रखें / جاری رکھیں",
  fullscreen_mode: true
};


//details
var details = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<h1 style="text-align:center;margin-bottom:0.25em;">Details</h1><p style="text-align:center;color:#555;margin-top:0;">Please complete all required fields.</p>',
  html: `
    <style>
      .survey-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 12px 16px;
        align-items: center;
        max-width: 880px;
        margin: 0 auto;
      }
      .survey-grid label {
        justify-self: end;
        font-weight: 600;
      }
      .survey-grid input,
      .survey-grid select,
      .survey-grid textarea {
        width: 100%;
        padding: 8px 10px;
        border: 1px solid #bbb;
        border-radius: 6px;
        font-size: 14px;
      }
      .survey-section {
        grid-column: 1 / -1;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #ddd;
        font-weight: 700;
        color: BLACK;
      }
      .hint {
        grid-column: 2 / -1;
        font-size: 12px;
        color: BLACK;
        margin-top: -8px;
        margin-bottom: 4px;
      }
      .full-row {
        grid-column: 1 / -1;
      }
      .inline {
        display: flex;
        gap: 14px;
        align-items: center;
      }
      .unit {
        color:BLACK; font-size:12px; margin-left:6px;
      }
      .ticks {
        display:flex; justify-content:space-between; font-size:12px; color:BLACK; margin-top:4px;
      }
    </style>

    <div class="survey-grid">

      <div class="survey-section">Demographics</div>

      <label for="name">Full name<span style="color:#c00;"> *</span></label>
      <input id="name" name="name" type="text" required placeholder="First Last" autocomplete="name" />
      
      <label for="email">E-mail id<span style="color:#c00;"> *</span></label>
      <input id="email" name="email" type="text" required placeholder="xyz@gmail.com" autocomplete="email" />
      
      <label for="age">Age<span style="color:#c00;"> *</span></label>
      <input id="age" name="age" type="number" min="16" max="120" step="1" required placeholder="e.g., 23" />

      <label for="sex">Sex<span style="color:#c00;"> *</span></label>
      <select id="sex" name="sex" required>
        <option value="" disabled selected>Select…</option>
        <option>Female</option>
        <option>Male</option>
        <option>Non-binary</option>
        <option>Prefer not to say</option>
      </select>

      <label for="occupation">Profession<span style="color:#c00;"> *</span></label>
      <input id="occupation" name="occupation" type="text" required placeholder="e.g., Student / Researcher" />

      <label for="education">Educational qualification<span style="color:#c00;"> *</span></label>
      <input id="education" name="education" type="text" required placeholder="e.g., BA, MSc, PhD" />

      <label for="city">Place of residence (City)<span style="color:#c00;"> *</span></label>
      <input id="city" name="city" type="text" required placeholder="e.g., Delhi / Dhaka / Lahore" />

      <div class="survey-section">Language & Script Background</div>

      <label for="languages">Languages you speak<span style="color:#c00;"> *</span></label>
      <textarea id="languages" name="languages" rows="2" required placeholder="e.g., Hindi (native), English (fluent), Urdu (basic)"></textarea>
      <div class="hint">List languages with proficiency if possible.</div>

      <label for="scripts">Scripts you can read<span style="color:#c00;"> *</span></label>
      <textarea id="scripts" name="scripts" rows="2" required placeholder="e.g., Devanagari, Perso-Arabic (Nastaliq), Latin"></textarea>

      <label for="dev_start_age">At what age did you start learning Devanagari?<span style="color:#c00;"> *</span></label>
      <div class="inline">
        <input id="dev_start_age" name="dev_start_age" type="number" min="0" max="100" step="1" required placeholder="e.g., 7" />
        <span class="unit">years</span>
      </div>

      <label for="pa_start_age">At what age did you start learning Perso-Arabic/Nasta'liq?<span style="color:#c00;"> *</span></label>
      <div class="inline">
        <input id="pa_start_age" name="pa_start_age" type="number" min="0" max="100" step="1" required placeholder="e.g., 10" />
        <span class="unit">years</span>
      </div>

      <div class="survey-section">Script Proficiency (1–10)</div>

      <label for="dev_rating">Devanagari proficiency<span style="color:BLACK;"> *</span></label>
      <div>
        <input id="dev_rating" name="dev_rating" type="range" min="1" max="10" step="1" value="5" required />
        <div class="ticks"><span>1</span><span>3</span><span>5</span><span>7</span><span>10</span></div>
      </div>

      <label for="pa_rating">Perso-Arabic/Nasta'liq proficiency<span style="color:BLACK;"> *</span></label>
      <div>
        <input id="pa_rating" name="pa_rating" type="range" min="1" max="10" step="1" value="5" required />
        <div class="ticks"><span>1</span><span>3</span><span>5</span><span>7</span><span>10</span></div>
      </div>

      <div class="full-row hint">Move the sliders to set your self-rated proficiency (1 = low, 10 = high).</div>

    </div>
  `,
  // Optional: put responses under a single key
  dataAsArray: false
};
//payment details page 
var payment_details = {
  type: jsPsychSurveyHtmlForm,
  preamble: '<h1 style="text-align:center;margin-bottom:0.25em;">Payment Details</h1><p style="text-align:center;color:black;margin-top:0;">Please provide accurate account information for compensation of INR 300.</p>',
  html: `
    <style>
      .pay-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 12px 16px;
        align-items: center;
        max-width: 880px;
        margin: 0 auto;
      }
      .pay-grid label {
        justify-self: end;
        font-weight: 600;
      }
      .pay-grid input {
        width: 100%;
        padding: 8px 10px;
        border: 1px solid #bbb;
        border-radius: 6px;
        font-size: 14px;
      }
      .pay-hint {
        grid-column: 2 / -1;
        font-size: 12px;
        color: #666;
        margin-top: -8px;
        margin-bottom: 4px;
      }
      .pay-note {
        grid-column: 1 / -1;
        font-size: 12px;
        color: #444;
        margin-top: 8px;
      }
    </style>

    <div class="pay-grid">
      <label for="acc_name">Account holder name<span style="color:#c00;"> *</span></label>
      <input id="acc_name" name="account_holder_name" type="text" required placeholder="e.g., Priya Sharma" autocomplete="name" />

      <label for="acc_number">Account number<span style="color:#c00;"> *</span></label>
      <input id="acc_number" name="account_number" type="text" inputmode="numeric" pattern="^[0-9]{9,18}$" required placeholder="9–18 digits" />
     
      <label for="ifsc">IFSC code<span style="color:#c00;"> *</span></label>
      <input id="ifsc" name="ifsc_code" type="text" style="text-transform:uppercase;" pattern="^[A-Z]{4}0[0-9A-Z]{6}$" maxlength="11" required placeholder="e.g., SBIN0001234" />
      
      <div class="pay-note">
        By submitting these details, you consent to their use solely for compensation processing. These details will be stored securely and not shared beyond the research/payment team.
      </div>
    </div>
  `,
  dataAsArray: false,
  data: { form: 'payment_details' }
};

//instructions
var instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="font-size:18pt; text-align:left; max-width:900px; margin:auto;">
         <p>
        Welcome to the experiment. Before you begin, please read these instructions carefully:  
      </p>
      <ul>
        <li>During this experiment you will see a <strong>word at the top of your screen</strong> written in a certain colour.</li>
        <li>Below this, you will see <strong>two words in black</strong>.</li>
        <li>Your task is always the same: <strong>decide the colour of the ink</strong> in which the top word is written.</li>
        <li>You must choose the option below that correctly names the colour of the ink.</li>
        <li>A <strong>“+” cross</strong> will appear before each word is shown.</li>
        <li>Please respond <strong>as quickly and as accurately as possible</strong>.</li>
      </ul>
            <hr>
            <p>प्रयोग में आपका स्वागत है। शुरू करने से पहले कृपया इन निर्देशों को ध्यान से पढ़ें:</p>
      <ul>
        <li>आपको स्क्रीन के ऊपर एक <strong>शब्द</strong> दिखाई देगा, जो किसी विशेष रंग में लिखा होगा।</li>
        <li>इसके नीचे आपको <strong>दो शब्द काले रंग में</strong> दिखाई देंगे।</li>
        <li>आपका कार्य हमेशा एक ही रहेगा: यह तय करना कि ऊपर लिखा शब्द <strong>किस रंग की स्याही</strong> से लिखा गया है।</li>
        <li>नीचे दिए गए दो विकल्पों में से सही रंग का नाम चुनें।</li>
        <li>हर शब्द आने से पहले आपको सबसे पहले एक <strong>“+” का चिह्न</strong> दिखाई देगा।</li>
        <li>कृपया <strong>जितनी जल्दी और जितनी सही तरह से हो सके</strong> प्रतिक्रिया दें।</li>
      </ul>
      
      <hr>
      <p>
        اس تجربے میں آپ کو اپنی اسکرین پر ایک مخصوص رنگ میں کوئی لفظ نظر آئے گا۔  
        اس سے نیچے آپ کو سیاہ روشنائی میں دو الفاظ نظر آئیں گے۔  
        آپ کا کام ایک ہی ہوگا کہ اوپر لکھے لفظ کی روشنائی کا رنگ بتائیں۔  
        آپ کو دیے گئے جوابات میں سے درست جواب کا انتخاب کرنا ہوگا جو اوپر لکھے ہوئے لفظ کی روشنائی کے رنگ کے متعلق ہوگا۔  
        ہر نئے لفظ سے پہلے ایک کراس کا نشان آئے گا۔  
        کوشش کریں کہ درست جواب کا انتخاب جلد از جلد کریں۔  
      </p>
      <div style="text-align:center; margin-top:20px;">
        <img src="design.png" style="width:500px; height:400px; display:block; margin:auto;">
      </div>
    </div>
  `,
  choices: ["Start Practice / अभ्यास शुरू करें / مشق شروع کریں"],
};

//stroop trial
//fixation
var fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:54pt; font-weight:bold; text-align:center;">+</div>',
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {
    task: 'fixation'
  }
};
//randomise each block in a variable and the variables to the array 
var trial ={
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    return `<div style="font-size:36pt; font-weight:bold; text-align:center;">
              ${jsPsych.timelineVariable('stim')}
            </div>`;
  },
 //stimulus: jsPsych.timelineVariable('stim'),
  choices: jsPsych.timelineVariable('options'),
  button_html: `<button style="
                  background-color:#F9F5F0;  
                  font-size:36pt; 
                  font-weight:bold; 
                  width:250px;                /* fixed width for all buttons */
                  height:100px;               /* fixed height so they're aligned */
                  border:none; 
                  border-radius:8px; 
                  margin:0 50px;              /* 100px total gap between buttons */
                  cursor:pointer;
                  text-align:center;">
                  %choice%
                </button>`,
  block: jsPsych.timelineVariable('block'),
  colour: jsPsych.timelineVariable('colour'),
  congruency:jsPsych.timelineVariable('congruency'),
  stim_eng: jsPsych.timelineVariable('stim_eng'), 
  options_roman: jsPsych.timelineVariable('options_roman'), 
  trial_duration:10000,
  on_finish: function(data) {
    if (data.response == jsPsych.timelineVariable('correct_answer')) {
      var accuracy = 1;
    } else {
      accuracy = 0;
    }
    
    data.accuracy = accuracy;
    data.task = "trial";
    }
};
var blank = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: ' ',
  trial_duration: 500,
  post_trial_gap: 0,
  choices: "N0_KEYS",
  data: {
    task: 'blank'
  }
};
var feedback = {
  data: {
    task: "feedback practice"
  },
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 500,
  stimulus: function() {
   var last_trial_acc = jsPsych.data.get().last(1).values()[0].accuracy;
    if (last_trial_acc == 1) {
      return '<p style="color: green; font-size:50px;">✓</p>'
    } else {
      return '<p style="color: red; font-size: 50px;">X</p>'
    }
  },
    };
//change the survey button shit
function redirectToExternalLink(url) {
  window.location.href = url;
}

var goodbye = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div style="font-size:18pt; text-align:left; max-width:800px; margin:auto;">
      
      <p>Thank you for your participation. Please fill the survey below. It will take about 2 more minutes.</p>
      <hr>
      <p>आपकी सहभागिता के लिए धन्यवाद। कृपया नीचे दिए गए <u>किसी एक</u> प्रश्नावली को भरें। इसमें लगभग 2 मिनट और लगेंगे।</p>
      <hr>
      <p>آپ کی شرکت کا شکریہ۔ براہ کرم نیچے دی گئی <u>کسی ایک</u> سوالنامہ کو پُر کریں۔ اس میں تقریباً 2 منٹ اور لگیں گے۔</p>
    </div>
  `,
  choices: [
      'Questionnaire in English',
  ],
  button_html: '<button class="jspsych-btn">%choice%</button>',
  

    on_finish: function(data) {
    var externalUrl = 'https://rug.eu.qualtrics.com/jfe/form/SV_cRVilsQTCV0xrKu'; // Replace with your desired URL
    redirectToExternalLink(externalUrl);
    data.redirected = true; 
            
  }
};

//breaks

var break_prac = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="font-size:18pt; text-align:center; max-width:800px; margin:auto;">
      <p>Practice is over. You can pause for a few minutes or continue.</p>
      <p> अभ्यास समाप्त हो गया है। आप कुछ मिनट रुक सकते हैं या आगे बढ़ सकते हैं।</p>
      <p> مشق ختم ہو گئی ہے۔ آپ چند منٹ رک سکتے ہیں یا آگے بڑھ سکتے ہیں۔</p>
    </div>
  `,
  choices: ["Continue / जारी रखें / جاری رکھیں"],
  data: { task_type: 'break_prac' }
}; 

var break_normalblock = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="font-size:18pt; text-align:center; max-width:800px; margin:auto;">
      <p><strong>English:</strong> Block is over. Please take a short break.</p>
      <p><strong>हिन्दी:</strong> खंड समाप्त हो गया है। कृपया थोड़ा विश्राम करें।</p>
      <p><strong>اردو:</strong> بلاک ختم ہو گیا ہے۔ براہ کرم مختصر وقفہ کریں۔</p>
    </div>
  `,
  choices: ["Continue / जारी रखें / جاری رکھیں"],
  data: { task_type: 'break_normalblock' }
};
 
//blocks
var prac = {
  timeline: [fixation,
    trial, feedback, blank],
  timeline_variables: practice,
  randomize_order: true,
  repetitions: 1,
  data:{task_type: 'practice', 
  stimulus: jsPsych.timelineVariable('stim'),
  choices: jsPsych.timelineVariable('options'),
  block: jsPsych.timelineVariable('block'),
  colour: jsPsych.timelineVariable('colour'),
  congruency:jsPsych.timelineVariable('congruency'),
  stim_eng: jsPsych.timelineVariable('stim_eng'),
  options_roman: jsPsych.timelineVariable('options_roman')
  }
};

var hindi_pure = {
  timeline: [fixation,
    trial,
    blank],
  timeline_variables: hindi_pure,
  randomize_order: true,
  repetitions: 1,
  data:{task_type: 'main',
  stimulus: jsPsych.timelineVariable('stim'),
  choices: jsPsych.timelineVariable('options'),
  block: jsPsych.timelineVariable('block'),
  colour: jsPsych.timelineVariable('colour'),
  congruency:jsPsych.timelineVariable('congruency'),
  stim_eng: jsPsych.timelineVariable('stim_eng'),
  options_roman: jsPsych.timelineVariable('options_roman')
  }
};
var urdu_pure = {
  timeline: [fixation,
    trial,
    blank],
  timeline_variables: urdu_pure,
  randomize_order: true,
  repetitions: 1,
  data:{task_type: 'main',
  stimulus: jsPsych.timelineVariable('stim'),
  choices: jsPsych.timelineVariable('options'),
  block: jsPsych.timelineVariable('block'),
  colour: jsPsych.timelineVariable('colour'),
  congruency:jsPsych.timelineVariable('congruency'),
  stim_eng: jsPsych.timelineVariable('stim_eng'),
  options_roman: jsPsych.timelineVariable('options_roman')
  }
};
var hindi_mixed = {
  timeline: [fixation,
    trial,
    blank],
  timeline_variables: hindi_mixed,
  randomize_order: true,
  repetitions: 1,
  data:{task_type: 'main',
  stimulus: jsPsych.timelineVariable('stim'),
  choices: jsPsych.timelineVariable('options'),
  block: jsPsych.timelineVariable('block'),
  colour: jsPsych.timelineVariable('colour'),
  congruency:jsPsych.timelineVariable('congruency'),
  stim_eng: jsPsych.timelineVariable('stim_eng'),
  options_roman: jsPsych.timelineVariable('options_roman')
  }
};
var urdu_mixed = {
  timeline: [fixation,
    trial,
    blank],
  timeline_variables: urdu_mixed,
  randomize_order: true,
  repetitions: 1,
  data:{task_type: 'main', 
  stimulus: jsPsych.timelineVariable('stim'),
  choices: jsPsych.timelineVariable('options'),
  block: jsPsych.timelineVariable('block'),
  colour: jsPsych.timelineVariable('colour'),
  congruency:jsPsych.timelineVariable('congruency'),
  stim_eng: jsPsych.timelineVariable('stim_eng'),
  options_roman: jsPsych.timelineVariable('options_roman')
  }
};
var ins_hp = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="font-size:18pt; text-align:center; max-width:800px; margin:auto;">
      <p> Choose the correct option based on the colour of the ink of the top word.</p>
      <p>ऊपर दिए गए शब्द की स्याही के रंग के आधार पर सही विकल्प चुनें।</p>
      <p>اوپر دیے گئے لفظ کی روشنائی کے رنگ کے مطابق درست جواب کا انتخاب کریں۔</p>
      <div style="text-align:center; margin-top:20px;">
        <img src="hindi_pure.png" style="width:500px; height:400px; display:block; margin:auto;">
      </div>
    </div>`,
  choices: ['Continue / जारी रखें / جاری رکھیں'],
  data: { task_type: 'ins_hp' }
};
var ins_hm = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="font-size:18pt; text-align:center; max-width:800px; margin:auto;">
      <p> Choose the correct option based on the colour of the ink of the top word.</p>
      <p>ऊपर दिए गए शब्द की स्याही के रंग के आधार पर सही विकल्प चुनें।</p>
      <p>اوپر دیے گئے لفظ کی روشنائی کے رنگ کے مطابق درست جواب کا انتخاب کریں۔</p>
      <div style="text-align:center; margin-top:20px;">
        <img src="hindi_mixed.png" style="width:500px; height:400px; display:block; margin:auto;">
      </div>
    </div>`,
  choices: ['Continue / जारी रखें / جاری رکھیں'],
  data: {task_type: 'ins_hm' }
};
var ins_um = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<div style="font-size:18pt; text-align:center; max-width:800px; margin:auto;">
      <p> Choose the correct option based on the colour of the ink of the top word.</p>
      <p>ऊपर दिए गए शब्द की स्याही के रंग के आधार पर सही विकल्प चुनें।</p>
      <p>اوپر دیے گئے لفظ کی روشنائی کے رنگ کے مطابق درست جواب کا انتخاب کریں۔</p>
      <div style="text-align:center; margin-top:20px;">
        <img src="urdu_mixed.png" style="width:500px; height:400px; display:block; margin:auto;">
      </div>     
    </div>`,
  choices: ['Continue / जारी रखें / جاری رکھیں'],
  data: {task_type: 'ins_um' }
};
var ins_up = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="font-size:18pt; text-align:center; max-width:800px; margin:auto;">
      <p> Choose the correct option based on the colour of the ink of the top word.</p>
      <p>ऊपर दिए गए शब्द की स्याही के रंग के आधार पर सही विकल्प चुनें।</p>
      <p>اوپر دیے گئے لفظ کی روشنائی کے رنگ کے مطابق درست جواب کا انتخاب کریں۔</p>
      <div style="text-align:center; margin-top:20px;">
        <img src="urdu_pure.png" style="width:500px; height:400px; display:block; margin:auto;">
      </div>
    </div>
  `,
  choices: ['Continue / जारी रखें / جاری رکھیں'],
  data: {task_type: 'ins_up' }
};
//select CONDITION
//push et al
if (CONDITION=='1'){
      timeline.push(fullscreen, details, payment_details, instructions, prac,  break_prac, ins_hp, hindi_pure, break_normalblock, ins_up, urdu_pure,  break_normalblock, ins_hm, hindi_mixed, break_normalblock, ins_um, urdu_mixed, goodbye);
    }
    else if (CONDITION=='2'){
      timeline.push(fullscreen, details, payment_details, instructions, prac,break_prac, ins_up, urdu_pure, break_normalblock, ins_hp, hindi_pure,  break_normalblock, ins_hm, hindi_mixed, break_normalblock, ins_um, urdu_mixed, goodbye);
    }
    else if (CONDITION=='3'){
      timeline.push(fullscreen, details, payment_details, instructions, prac,break_prac, ins_hp, hindi_pure, break_normalblock, ins_up, urdu_pure,  break_normalblock, ins_um, urdu_mixed, break_normalblock, ins_hm, hindi_mixed, goodbye);
    }
    else if(CONDITION=='4'){
      timeline.push(fullscreen, details, payment_details, instructions, prac,break_prac, ins_up, urdu_pure, break_normalblock, ins_hp, hindi_pure,  break_normalblock, ins_um, urdu_mixed, break_normalblock, ins_hm, hindi_mixed, goodbye);
    }
jsPsych.run(timeline);s