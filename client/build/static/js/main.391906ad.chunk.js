(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{156:function(e,t,a){e.exports=a(315)},161:function(e,t,a){},162:function(e,t,a){},186:function(e,t){},188:function(e,t){},227:function(e,t){},228:function(e,t){},287:function(e,t,a){},312:function(e,t){},315:function(e,t,a){"use strict";a.r(t);var n,r=a(0),o=a.n(r),l=a(32),i=a.n(l),s=(a(161),a(162),a(17)),c=a(30),u=a(12),p=a(13),d=a(16),m=a(14),h=a(8),b=a(15),v=a(7),f=a(2),E=a(45),g=a.n(E),O=function(e){return console.log("loggin in ",e),{type:"LOGING-IN-COMP",payload:e}},y=function(e){return{type:"SIGNING-UP-COMP",payload:e}},N=function(e){return{type:"DOING-ASYNC",payload:e}},w=a(150),j=a(24),k=a(10),I=(n={signupforgame:"SIGN-UP-FOR-GAME",error:"ERROR",success:"SUCCESS",setuser:"SET-USER",submitanswer:"SUBMIT-ANSWER",getgameobject:"GET-GAME",setgameobject:"SET-GAME",blockout:"BLOCK-OUT",youwin:"WIN",totalwinnersreached:"TOTAL-WINNERS-REACHED",wronganswer:"WRONG-ANSWER"},Object(k.a)(n,"submitanswer","SUBMIT-ANSWER"),Object(k.a)(n,"updateprofile","UPDATE-PROFILE"),Object(k.a)(n,"turngameonoroff","TURN-ON-OFF"),Object(k.a)(n,"verifyaccount","VERIFY"),Object(k.a)(n,"passwordreset","PASSWORDRESET"),Object(k.a)(n,"verifyreset","VERIFYRESET"),Object(k.a)(n,"resetuser","RESETUSER"),n),A=I.updateprofile,C=I.verifyaccount,S=I.passwordreset,P=I.verifyreset,T="".concat("https://topner.herokuapp.com","/"),R=function(e){return{type:"SET-ACTIVE-USER",payload:{user:e}}},U=function(e){return function(t,a){var n=a().components.Socket,r=a().auth.user;n.emit(A,{data:e,_id:r})}},_=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(m.a)(t).call(this))).handleInputChange=e.handleInputChange.bind(Object(h.a)(e)),e.validateField=e.validateField.bind(Object(h.a)(e)),e.createUserAccount=e.createUserAccount.bind(Object(h.a)(e)),e}return Object(b.a)(t,e),Object(p.a)(t,[{key:"handleInputChange",value:function(e){var t=e.target,a=t.id,n=t.value;this.props.signupInputAction({id:a,value:n}),this.props.signupInputValidation({id:a,value:n})}},{key:"validateField",value:function(e){var t=e.target,a=t.id,n=t.value;this.props.signupInputValidation({id:a,value:n})}},{key:"createUserAccount",value:function(e){e.preventDefault(),this.props.createUserAccount(this.props.signup_input_data)}},{key:"render",value:function(){var e=this.props,t=e.signup_input_data,a=e.validation,n=e.auth,r=e.signingup,l=t.name,i=t.email,s=t.username,u=t.password,p=(t.bank,t.account_number,t.confirm_password),d=a.name,m=a.email,h=a.username,b=a.password,v=(a.bank,a.account_number,a.confirm_password),f=r?o.a.createElement("button",{className:"tp-auth-btn",disabled:!0},o.a.createElement("i",{className:"fas fa-circle-notch fa-spin"})," Creating account..."):o.a.createElement("button",{className:"tp-auth-btn",disabled:!1},"Create Account");return n?o.a.createElement(c.a,{to:"/dashboard"}):o.a.createElement("div",{className:"tp-auth-container"},o.a.createElement("h2",{className:"tp-auth-title"},"Sign up"),o.a.createElement("form",{onSubmit:this.createUserAccount},o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"name"},"Fullname"),o.a.createElement("input",{type:"text",className:"tp-input-field ".concat(d?"":"tp-invalid-field"),placeholder:"John Doe",id:"name",required:!0,value:l,onChange:this.handleInputChange,onBlur:this.validateField}),!d&&o.a.createElement("p",{className:"tp-field-error"},"*field is not valid")),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"email"},"Email"),o.a.createElement("input",{type:"email",placeholder:"Email",className:"tp-input-field ".concat(m?"":"tp-invalid-field"),id:"email",required:!0,value:i,onChange:this.handleInputChange,onBlur:this.validateField}),!m&&o.a.createElement("p",{className:"tp-field-error"},"*email is not valid")),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"username"},"Username"),o.a.createElement("input",{type:"text",className:"tp-input-field ".concat(h?"":"tp-invalid-field"),placeholder:"Username",id:"username",required:!0,value:s,onChange:this.handleInputChange,onBlur:this.validateField}),o.a.createElement("p",{className:"tp-form-note"},"* Username can only have letters and _"),!h&&o.a.createElement("p",{className:"tp-field-error"},"*Username can contain only letters and _")),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"password"},"Password"),o.a.createElement("input",{type:"password",className:"tp-input-field ".concat(b?"":"tp-invalid-field"),placeholder:"Password",id:"password",required:!0,value:u,onChange:this.handleInputChange,onBlur:this.validateField}),o.a.createElement("div",{className:"tp-form-note"},o.a.createElement("p",null,"* must have an uppercase"),o.a.createElement("p",null,"* must have a lowercase"),o.a.createElement("p",null,"* must have a number"),o.a.createElement("p",null,"* must have any of this #$^+=!*()@%&")),!b&&o.a.createElement("p",{className:"tp-field-error"},"*password must contain numbers,lowercase, uppercas, any of this [@#$%..]")),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"confirm_password"},"Confirm Password"),o.a.createElement("input",{type:"password",className:"tp-input-field ".concat(v?"":"tp-invalid-field"),placeholder:"Confirm Password",id:"confirm_password",required:!0,value:p,onChange:this.handleInputChange,onBlur:this.validateField}),!v&&o.a.createElement("p",{className:"tp-field-error"},"*passwords do not match")),o.a.createElement("div",null,f)))}}]),t}(r.Component),F=Object(v.b)(function(e){return{signup_input_data:e.input.signup,validation:e.validation.signup,error:e.error.signup,auth:e.auth.user,signingup:e.components.signingup}},function(e){return{signupInputAction:function(t){e(function(e){return{type:"SIGNUP_INPUT",payload:e}}(t))},signupInputValidation:function(t){e(function(e){return function(t,a){var n,r=e.id,o=e.value,l={type:"SIGNUP-VALIDATION",payload:{id:r,valid:null}};switch(r){case"name":n=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(o),l=Object(f.a)({},l,{payload:{id:r,valid:n,index:0}});break;case"email":n=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(o),l=Object(f.a)({},l,{payload:{id:r,valid:n,index:1}});break;case"password":t({type:"SIGNUP-VALIDATION",payload:{id:"confirm_password",valid:a().input.signup.confirm_password===o,index:5}}),n=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/.test(o),l=Object(f.a)({},l,{payload:{id:r,valid:n,index:5}});break;case"bank":n=["Firstbank","GTB","Polaris Bank","Access Bank","UBA","Fidelity Bank","Eco Bank"].includes(o),l=Object(f.a)({},l,{payload:{id:r,valid:n,index:3}});break;case"account_number":n=/^[0-9]{10}$/.test(o),l=Object(f.a)({},l,{payload:{id:r,valid:n,index:4}});break;case"confirm_password":n=o===a().input.signup.password,l=Object(f.a)({},l,{payload:{id:r,valid:n,index:6}});break;case"username":var i={id:r,valid:n=/^[a-z0-9-_A-Z]{6,30}$/.test(o),index:2};l=Object(f.a)({},l,{payload:i})}t(l)}}(t))},createUserAccount:function(t){e(function(e){return function(t,a){t(y(!0)),g.a.post("".concat(T,"auth/signup"),e,{withCredentials:!0}).then(function(e){var a=e.data,n=a.error,r=a.success;n?(t({type:"SIGNUP-ERROR",payload:{error:n.message,success:null}}),t(y(!1)),Object(j.b)(n.message,{delay:50,className:"tp-toast-error"})):(t({type:"SIGNUP-SUCCESS",payload:{error:null,success:r.message}}),Object(j.b)("Account created successfully, you can login now",{delay:50,className:"tp-toast-success"})),t(y(!1))}).catch(function(e){t({type:"SIGNUP-ERROR",payload:e.message}),t(y(!1)),Object(j.b)(e.message,{delay:50,className:"tp-toast-error"})})}}(t))}}})(_),G=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(m.a)(t).call(this))).handleInputChange=e.handleInputChange.bind(Object(h.a)(e)),e.validateField=e.validateField.bind(Object(h.a)(e)),e.logUserIn=e.logUserIn.bind(Object(h.a)(e)),e}return Object(b.a)(t,e),Object(p.a)(t,[{key:"handleInputChange",value:function(e){var t=e.target,a=t.id,n=t.value;this.props.loginInputAction({id:a,value:n})}},{key:"validateField",value:function(e){}},{key:"logUserIn",value:function(e){e.preventDefault(),this.props.loguserin(this.props.login_input_data)}},{key:"render",value:function(){var e=this.props,t=e.login_input_data,a=e.validation,n=e.auth,r=e.logingin,l=t.email,i=t.password,u=a.email,p=r?o.a.createElement("button",{className:"tp-auth-btn",disabled:!0},o.a.createElement("i",{className:"fas fa-circle-notch fa-spin"})," Loging in..."):o.a.createElement("button",{className:"tp-auth-btn",disabled:!1},"Log in");return n?o.a.createElement(c.a,{to:"/dashboard"}):o.a.createElement("div",{className:"tp-auth-container"},o.a.createElement("h2",{className:"tp-auth-title"},"Login"),o.a.createElement("form",{onSubmit:this.logUserIn},o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"email"},"Email"),o.a.createElement("input",{type:"email",id:"email",placeholder:"Email",required:!0,className:"tp-input-field ".concat(u?"":"tp-invalid-field"),value:l,onChange:this.handleInputChange,onBlur:this.validateField}),!u&&o.a.createElement("p",{className:"tp-field-error"},"* email is invalid")),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"password"},"Password"),o.a.createElement("input",{type:"password",id:"password",placeholder:"password",required:!0,className:"tp-input-field",value:i,onChange:this.handleInputChange})),o.a.createElement("div",null,p),o.a.createElement("div",null,o.a.createElement("p",null,o.a.createElement(s.b,{to:"/auth/password-reset",className:"tp-forgot-password"},"Forgot Password")))))}}]),t}(r.Component),D=Object(v.b)(function(e){return{login_input_data:e.input.login,validation:e.validation.login,auth:e.auth.user,error:e.error.login,logingin:e.components.logingin}},function(e){return{loginInputAction:function(t){e(function(e){return{type:"LOGIN_INPUT",payload:e}}(t))},loginValidation:function(t){e({type:"LOGIN-VALIDATION",payload:{valid:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)}})},loguserin:function(t){return e(function(e){return function(t,a){t(O(!0)),g.a.post("".concat(T,"auth/login"),e,{withCredentials:!0}).then(function(e){var a=e.data,n=a.error,r=a.success;if(n)t({type:"LOGIN-ERROR",payload:{error:n}}),t(O(!1)),Object(j.b)("Invalid credentials provided",{delay:50,className:"tp-toast-error"});else{var o=w.verify(r.auth,"posiedonathenazeuskratoshydra");t({type:"SET-ACTIVE-USER",payload:{user:o.auth}}),t(O(!1))}}).catch(function(e){console.log(e),t({type:"LOGIN-ERROR",payload:{error:"Invalid credentials provided"}}),t(O(!1)),Object(j.b)(e.message,{delay:50,className:"tp-toast-error"})})}}(t))}}})(G),q=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(m.a)(t).call(this))).handleInputChange=e.handleInputChange.bind(Object(h.a)(e)),e.requestPasswordReset=e.requestPasswordReset.bind(Object(h.a)(e)),e}return Object(b.a)(t,e),Object(p.a)(t,[{key:"handleInputChange",value:function(e){var t=e.target,a=t.id,n=t.value;this.props.passwordResetInputAction({id:a,value:n})}},{key:"requestPasswordReset",value:function(e){e.preventDefault();var t=this.props.resetpassword_input_data.email;console.log("requesting password reset now"),this.props.requestPasswordReset(t)}},{key:"render",value:function(){var e=this.props,t=e.validation,a=e.resetpassword_input_data.email,n=t.email;t.validfield;return o.a.createElement("div",{className:"tp-auth-container"},o.a.createElement("h2",{className:"tp-auth-title"},"Password Reset"),o.a.createElement("form",{onSubmit:this.requestPasswordReset},o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"email"},"Email"),o.a.createElement("input",{type:"email",placeholder:"email",id:"email",required:!0,className:"tp-input-field ".concat(n?"":"tp-invalid-field"),value:a,onChange:this.handleInputChange})),o.a.createElement("div",null,o.a.createElement("button",{className:"tp-auth-btn"},"Send reset link"))))}}]),t}(r.Component),B=Object(v.b)(function(e){return{resetpassword_input_data:e.input.resetpassword,validation:e.validation.passwordreset}},function(e){return{passwordResetInputAction:function(t){e(function(e){return{type:"PASSWORD_RESET_INPUT",payload:e}}(t))},passwordResetValidation:function(t){e({type:"PASSWORD-RESET-VALIDATION",payload:{valid:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)}})},requestPasswordReset:function(t){e(function(e){return function(t,a){t(N(!0)),a().components.Socket.emit(S,e)}}(t))}}})(q),z=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("li",null,o.a.createElement(s.c,{activeClassName:"tp-active-link-class",exact:!0,to:"/auth/login"},"Login")),o.a.createElement("li",null,o.a.createElement(s.c,{activeClassName:"tp-active-link-class",exact:!0,to:"/auth/signup"},"Signup")))},L=Object(v.b)(function(e){return{dropdown:e.components.dropdownopen}},function(e){return{loguserout:function(t){return t.preventDefault(),e(function(e){g.a.post("".concat(T,"auth/logout"),{},{withCredentials:!0}).then(function(t){t.data.error||e(R(null))})})},openDropdown:function(){return e((console.log("opening drop down action "),{type:"DROP-COMP",payload:null}))}}})(function(e){var t=e.user,a=e.loguserout,n=e.dropdown,r=e.openDropdown;return o.a.createElement(o.a.Fragment,null,o.a.createElement("li",null,o.a.createElement("div",{className:"tp-initials",onClick:r},o.a.createElement("span",null,t.username[0]),o.a.createElement("div",{className:"tp-drop-down ".concat(n?"tp-open":"")},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement(s.b,{to:"/update_profile"},"Update profile")),o.a.createElement("li",null,o.a.createElement("a",{href:"javascript:void(0)",onClick:a},"logout")))))))}),x=function(e){var t=e.user,a=t?o.a.createElement(L,{user:t}):o.a.createElement(z,null);return o.a.createElement("nav",{className:"tp-navigation"},o.a.createElement(s.b,{to:"/dashboard",className:"tp-brand"},"Topners"),o.a.createElement("ul",null,a))},Z=(a(287),function(e){var t=e.question,a=e.submitAnswer,n=e.blockedout,r=t.option.map(function(e,t){return o.a.createElement("label",{className:"tp-radio-container",key:t},e,o.a.createElement("input",{type:"radio",name:"answer",onChange:a,value:e}),o.a.createElement("span",{className:"tp-checkmark"}))});return o.a.createElement("div",{className:"tp-question"},o.a.createElement("h3",{className:"tp-question-head"},t.question),n?o.a.createElement("h2",{style:{color:"red"}},"Blocked out"):o.a.createElement("form",null,o.a.createElement("div",null,r)))}),W=function(){return o.a.createElement("div",{className:"tp-how-it-works"},o.a.createElement("h2",{className:"tp-how"},"How it works ?"),o.a.createElement("div",{className:"tp-step"},o.a.createElement("h4",null,"Step 1"),o.a.createElement("h5",null,"Deposit into your accout"),o.a.createElement("p",null,"The very first step is to pay money into your account, account with amount less than 100 would be blocked out of joining games, be rest assured that paying with us is very safe and secure")),o.a.createElement("div",{className:"tp-step"},o.a.createElement("h4",null,"Step 2"),o.a.createElement("h5",null,"Sign up for game"),o.a.createElement("p",null,"After depositing into your account, the next step is to sign up for a game, then wait to recieve questions for answering")),o.a.createElement("div",{className:"tp-step"},o.a.createElement("h4",null,"Step 3"),o.a.createElement("h5",null,"Got question?, be smart and fast"),o.a.createElement("p",null,"Questions are posted every"," ",o.a.createElement("b",null,"Sunday, at 7:30pm, dont just get them right, you need to be fast and fall among the top people, because only the ",o.a.createElement("b",null,"Topners")," win"))),o.a.createElement("div",{className:"tp-step"},o.a.createElement("h4",null,"Step 4"),o.a.createElement("h5",null,"I won , time to get paid"),o.a.createElement("p",null,"The best part, payments are made during the following week after previous game, please note that payments are made into the provided account number")),o.a.createElement("div",{className:"tp-step"},o.a.createElement("h4",{style:{color:"red"}},"Note"),o.a.createElement("p",null,"Questions are removed 10 minutes after they have been posted, in other words you have the first ten minutes after the question has been posted to answer them")))},M=I.signupforgame,V=I.submitanswer,$=I.getgameobject,Y=I.setgameobject,H=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(m.a)(t).call(this))).signUpForGame=e.signUpForGame.bind(Object(h.a)(e)),e.submitAnswer=e.submitAnswer.bind(Object(h.a)(e)),e}return Object(b.a)(t,e),Object(p.a)(t,[{key:"signUpForGame",value:function(){return this.props.doingAsync(!0),this.props.signupForGame()}},{key:"submitAnswer",value:function(e){if(e.target.checked)return this.props.doingAsync(!0),this.props.submitAnswer(e.target.value)}},{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){this.props.getGameObject()}},{key:"render",value:function(){var e=this.props,t=e.user,a=e.game,n=t||{},r=n.username,l=n.account_balance,i=(n.account_number,n.bank),s=n.signupForNextGameShow,u=a.game,p=a.correct,d=a.wrong,m=a.blockout,h=(u||{}).gameison;return t?o.a.createElement("div",{className:"tp-main-container"},o.a.createElement("div",{className:"tp-user-header"},o.a.createElement("h4",null,"hi, ",r),o.a.createElement("div",null,o.a.createElement("h4",null,"\u20a6 ",l.toFixed(1)),o.a.createElement("a",{href:"https://paystack.com/pay/topner",className:"tp-top-up-account"},"Deposit"))),l&&i?"":o.a.createElement("p",{className:"tp-form-note"},"You have not provided an account number or bank name, please update your profile"),o.a.createElement("div",{className:"tp-question-container"},u&&h&&s?o.a.createElement(Z,{question:u.question,submitAnswer:this.submitAnswer,correct:p,wrong:d,blockedout:m}):o.a.createElement("p",{className:"tp-form-note"},"! When you are signed up for a game, and question is available for answering , it will appear here")),o.a.createElement("div",{className:"tp-card-container"},o.a.createElement("div",{className:"tp-card ".concat(h||s&&"tp-block-out"),onClick:this.signUpForGame},o.a.createElement("div",{className:"tp-card-top"},o.a.createElement("h1",null,"Fastsmart"),(h||s)&&o.a.createElement("h3",{style:{color:"red"}},"Closed")),o.a.createElement("div",{className:"tp-card-bottom"},o.a.createElement("div",{className:"tp-entrance-fee"},o.a.createElement("h4",null,"Entrance fee"),o.a.createElement("h4",null,"\u20a6100")),o.a.createElement("div",{className:"tp-possible-win"},o.a.createElement("h4",null,"Win"),o.a.createElement("h4",null,"upto 100k"))))),o.a.createElement(W,null)):o.a.createElement(c.a,{to:"/auth/login"})}}]),t}(r.Component),J=Object(v.b)(function(e){return{user:e.auth.user,game:e.game}},function(e){return{signupForGame:function(){return e(function(e,t){var a=t().auth.user;t().components.Socket.emit(M,a)})},getGameObject:function(){return e(function(e,t){t().components.Socket.emit($)})},submitAnswer:function(t){return e(function(e){return function(t,a){var n=a().auth.user,r=a().game.game.question.answer,o=a().game.game.totalNumberOfWinners;a().components.Socket.emit(V,{user:n,checkanswer:e===r,totalNumberOfWinners:o})}}(t))},doingAsync:function(t){return e(N(t))}}})(H),K=function(){return o.a.createElement("div",{className:"tp-loader-container"},o.a.createElement("div",{className:"tp-loader"},o.a.createElement("div",{className:"tp-load tp-loader1"}),o.a.createElement("div",{className:"tp-load tp-loader2"}),o.a.createElement("div",{className:"tp-load tp-loader3"}),o.a.createElement("h3",{style:{color:"#fff"}},"Loading...")))},Q=I.error,X=I.success,ee=I.setuser,te=I.setgameobject,ae=I.blockout,ne=I.totalwinnersreached,re=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentWillMount",value:function(){this.props.toast.configure({autoClose:!1})}},{key:"componentDidMount",value:function(){var e=this,t=this.props.Socket,a=this.props.toast;t.on(Q,function(t){a.isActive(1)?(a.dismiss(1),a(t,{toastId:1,delay:50,type:a.TYPE.INFO,className:"tp-toast-error"})):a(t,{toastId:1,delay:50,type:a.TYPE.INFO,className:"tp-toast-error"}),e.props.doingAsync(!1)}),t.on(X,function(t){a.dismiss(2),a(t,{toastId:2,delay:50,type:a.TYPE.INFO,className:"tp-toast-success"}),e.props.doingAsync(!1)}),t.on(ee,function(t){return e.props.setActiveUser(t)}),t.on(te,function(t){e.props.setGameObject(t)}),t.on(ae,function(e){a.update("Blocked out",{delay:5e3,type:a.TYPE.INFO,className:"tp-toast-error"})}),t.on(ne,function(t){return e.props.doingAsync(!1),a(t,{delay:50,type:a.TYPE.INFO,className:"tp-toast-success"})})}},{key:"render",value:function(){return null}}]),t}(r.Component),oe=Object(v.b)(function(e){return{Socket:e.components.Socket}},function(e){return{setGameObject:function(t){return e((a=t,function(e,t){e({type:Y,payload:a})}));var a},setActiveUser:function(t){return e(R(t))},doingAsync:function(t){return e(N(t))},updateUserProfile:function(t){return e(U(t))}}})(re),le=(a(288),function(){return o.a.createElement("div",{className:"tp-ring"},o.a.createElement("div",null),o.a.createElement("div",null),o.a.createElement("div",null))}),ie=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(m.a)(t).call(this))).updateUserProfile=e.updateUserProfile.bind(Object(h.a)(e)),e.handleInputChange=e.handleInputChange.bind(Object(h.a)(e)),e}return Object(b.a)(t,e),Object(p.a)(t,[{key:"handleInputChange",value:function(e){var t=e.target,a=t.id,n=t.value;console.log(a," ",n),this.props.updateProfileInputAction({id:a,value:n})}},{key:"updateUserProfile",value:function(e){var t=this.props.input_data;e.preventDefault(),this.props.updateUserProfile(t)}},{key:"render",value:function(){var e=this.props,t=e.user,a=e.input_data,n=t||{},r=n.name,l=n.account_number,i=n.bank,s=a.name,c=a.bank,u=a.account_number;return o.a.createElement("div",{className:"tp-updateprofile-container"},o.a.createElement("div",{className:"tp-updateprofile-user"}),o.a.createElement("div",{className:"tp-auth-container"},o.a.createElement("h2",{className:"tp-auth-title"},"Update profile"),o.a.createElement("form",{onSubmit:this.updateUserProfile},o.a.createElement("h5",null,r),o.a.createElement("label",{for:"name",className:"tp-label"},"Name",o.a.createElement("input",{type:"text",placeholder:"new name",className:"tp-input-field",required:!0,value:s,onChange:this.handleInputChange,id:"name"})),o.a.createElement("div",null,o.a.createElement("h5",null,i),o.a.createElement("label",{htmlFor:"bank"},"Bank Name"),o.a.createElement("select",{id:"bank",required:!0,value:c,onChange:this.handleInputChange},o.a.createElement("option",{disabled:!0},"Select your bank"),o.a.createElement("option",null,"Firstbank"),o.a.createElement("option",null,"UBA"),o.a.createElement("option",null,"Access Bank"),o.a.createElement("option",null,"Polaris Bank"),o.a.createElement("option",null,"Fidelity Bank"),o.a.createElement("option",null,"GTB"),o.a.createElement("option",null,"Eco Bank"))),o.a.createElement("div",null,o.a.createElement("h5",null,l),o.a.createElement("label",{htmlFor:"account_number"},"Account number"),o.a.createElement("input",{type:"text",placeholder:"Account number",id:"account_number",value:u,onChange:this.handleInputChange})),o.a.createElement("div",null,o.a.createElement("button",{class:"tp-auth-btn"},"Save Changes")))))}}]),t}(r.Component),se=Object(v.b)(function(e){return{user:e.auth.user,input_data:e.input.updateProfile}},function(e){return{updateUserProfile:function(t){return e(U(t))},updateProfileInputAction:function(t){return e(function(e){return{type:"UPDATE-PROFILE-INPUT",payload:e}}(t))}}})(ie),ce=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this.props;(0,e.verifyAccount)(e.match.params)}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"hello there"))}}]),t}(r.Component),ue=Object(v.b)(null,function(e){return{verifyAccount:function(t){return e(function(e){return function(t,a){console.log("verify");var n=a().components.Socket;console.log(n),n.emit(C,e)}}(t))}}})(ce),pe=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(m.a)(t).call(this))).state={valid:!1,checked:!1,input:{password:"Samson1@",confirm_password:"Samson1@"}},e.handleInputChange=e.handleInputChange.bind(Object(h.a)(e)),e.resetPassword=e.resetPassword.bind(Object(h.a)(e)),e}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){var e=this.props;e.email,e.token;console.log(this.props)}},{key:"handleInputChange",value:function(e){var t=e.target,a=t.id,n=t.value;console.log(a,n);var r=Object(f.a)({},this.state.input,Object(k.a)({},a,n));this.setState({input:r})}},{key:"resetPassword",value:function(e){e.preventDefault();var t=this.state.input,a=t.password,n=t.confirm_password,r=this.props.match.params,o=r.email,l=r.token;return a!==n?Object(j.b)("Passwords do not match",{delay:50,className:"tp-toast-error"}):this.props.validateResetToken({password:a,email:o,token:l})}},{key:"render",value:function(){var e=this.state.input,t=e.password,a=e.confirm_password;return o.a.createElement("div",{className:"tp-auth-container"},o.a.createElement("form",{onSubmit:this.resetPassword},o.a.createElement("label",{className:"tp-label"},"Password",o.a.createElement("input",{type:"password",className:"tp-input-field",placeholder:"Confirm password",value:t,id:"password",onChange:this.handleInputChange,required:!0})),o.a.createElement("label",{className:"tp-label"},"Password",o.a.createElement("input",{type:"password",className:"tp-input-field",placeholder:"Password",id:"confirm_password",value:a,onChange:this.handleInputChange,required:!0})),o.a.createElement("div",null,o.a.createElement("button",{className:"tp-auth-btn"},"Reset Password"))))}}]),t}(r.Component),de=Object(v.b)(null,function(e){return{validateResetToken:function(t){return e(function(e){return function(t,a){t(N(!0)),a().components.Socket.emit(P,e)}}(t))}}})(pe);var me=Object(v.b)(function(e){return{loading:e.auth.loading,user:e.auth.user,doingAsync:e.components.doingAsync}})(function(e){var t=e.loading,a=e.user,n=e.doingAsync,r=e.socket;return t?o.a.createElement(K,null):o.a.createElement(s.a,null,o.a.createElement("div",{className:"App"},o.a.createElement(j.a,null),o.a.createElement(x,{user:a}),n&&o.a.createElement(le,null),o.a.createElement(c.d,null,o.a.createElement(c.b,{path:"/auth/signup",exact:!0,component:F}),o.a.createElement(c.b,{path:"/auth/login",exact:!0,component:D}),o.a.createElement(c.b,{path:"/dashboard",exact:!0,render:function(e){return o.a.createElement(J,Object.assign({},e,{socket:r}))}}),o.a.createElement(c.b,{path:"/auth/password-reset",exact:!0,component:B}),o.a.createElement(c.b,{path:"/update_profile",exact:!0,render:function(e){return o.a.createElement(se,Object.assign({},e,{user:a}))}}),o.a.createElement(c.b,{path:"/verify_email/:email/:token",exact:!0,component:ue}),o.a.createElement(c.b,{path:"/password_reset/:email/:token",exact:!0,component:de})),o.a.createElement(oe,{toast:j.b})))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var he=a(33),be={login:{email:"",password:""},resetpassword:{email:""},signup:{name:"",email:"",username:"",password:"",confirm_password:""},updateProfile:{name:"Odiagbe Osaro",bank:"Select your bank",account_number:""}},ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:be,t=arguments.length>1?arguments[1]:void 0,a=t.payload?t.payload:{},n=a.id,r=a.value;switch(t.type){case"LOGIN_INPUT":var o=Object(f.a)({},e.login,Object(k.a)({},n,r));e=Object(f.a)({},e,{login:o});break;case"SIGNUP_INPUT":var l=Object(f.a)({},e.signup,Object(k.a)({},n,r));e=Object(f.a)({},e,{signup:l});break;case"PASSWORD_RESET_INPUT":var i=Object(f.a)({},e.resetpassword,Object(k.a)({},n,r));e=Object(f.a)({},e,{resetpassword:i});break;case"UPDATE-PROFILE-INPUT":var s=Object(f.a)({},e.updateProfile,Object(k.a)({},n,r));e=Object(f.a)({},e,{updateProfile:s})}return e},fe={signup:{name:!0,email:!0,password:!0,bank:!0,account_number:!0,confirm_password:!0,username:!0,validField:[!1,!1,!1,!1,!1,!1,!1]},login:{email:!0,validfield:!1},passwordreset:{email:!0,validfield:!1}},Ee=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fe,a=arguments.length>1?arguments[1]:void 0,n=a.payload?a.payload:{},r=n.id,o=n.valid,l=n.index;switch(a.type){case"SIGNUP-VALIDATION":var i=t.signup.validField;i[l]=o;var s=Object(f.a)({},t.signup,(e={},Object(k.a)(e,r,o),Object(k.a)(e,"validField",i),e));t=Object(f.a)({},t,{signup:s});break;case"LOGIN-VALIDATION":var c=Object(f.a)({},t.login,{email:o,validfield:o});t=Object(f.a)({},t,{login:c});break;case"PASSWORD-RESET-VALIDATION":var u=Object(f.a)({},t.passwordreset,{email:o,validfield:o});t=Object(f.a)({},t,{passwordreset:u})}return t},ge={signup:{error:null,success:null},login:{error:null}},Oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ge,t=arguments.length>1?arguments[1]:void 0,a=t.payload||{},n=a.error,r=a.success;switch(t.type){case"SIGNUP-ERROR":var o={error:n,success:r};e=Object(f.a)({},e,{signup:o});break;case"LOGIN-ERROR":console.log(n);var l={error:n};e=Object(f.a)({},e,{login:l})}return e},ye={loading:!0,user:null},Ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ye,t=arguments.length>1?arguments[1]:void 0,a=t.payload?t.payload:{},n=a.loading,r=a.user;switch(t.type){case"AUTHENTICATION-END":e=Object(f.a)({},e,{loading:n});break;case"SET-ACTIVE-USER":console.log(r),e=Object(f.a)({},e,{user:r})}return e},we={logingin:!1,signingup:!1,dropdownopen:!1,notification:null,Socket:null,doingAsync:!1},je=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:we,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGING-IN-COMP":e=Object(f.a)({},e,{logingin:t.payload});break;case"SIGNING-UP-COMP":e=Object(f.a)({},e,{signingup:t.payload});break;case"DROP-COMP":var a=!e.dropdownopen;e=Object(f.a)({},e,{dropdownopen:a});break;case"NOTIFICATION":var n=t.payload;e=Object(f.a)({},e,{notification:n});break;case"CREATE-SOCKET-CONNECTION":var r=t.payload;e=Object(f.a)({},e,{Socket:r});break;case"DOING-ASYNC":e=Object(f.a)({},e,{doingAsync:t.payload})}return e},ke=I.setgameobject;console.log(ke);var Ie={game:null,blockout:!1},Ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET-GAME-OBJECT":e=Object(f.a)({},e,{game:t.payload.game});break;case"WRONG-OR-RIGHT":e=Object(f.a)({},e,{correct:t.payload,wrong:!t.payload});break;case"BLOCK-OUT":e=Object(f.a)({},e,{blockout:t.payload});break;case ke:console.log("dispatched an action"),e=Object(f.a)({},e,{game:t.payload})}return e},Ce=Object(he.c)({input:ve,validation:Ee,error:Oe,auth:Ne,components:je,game:Ae}),Se=a(154),Pe=a(155)("https://topner.herokuapp.com"),Te=Object(he.d)(Ce,Object(he.a)(Se.a));Te.dispatch(function(e){g.a.get("".concat(T,"auth/verify_authentication"),{withCredentials:!0}).then(function(t){var a=t.data,n=a.error,r=a.success;n?e({type:"AUTHENTICATION-END",payload:{loading:!1}}):(e({type:"AUTHENTICATION-END",payload:{loading:!1}}),e(R(r.auth)))}).catch(function(t){e({type:"AUTHENTICATION-END",payload:{loading:!1}})})}),Te.getState().components.Socket||Te.dispatch({type:"CREATE-SOCKET-CONNECTION",payload:Pe}),i.a.render(o.a.createElement(v.a,{store:Te},o.a.createElement(me,{socket:Pe})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[156,1,2]]]);
//# sourceMappingURL=main.391906ad.chunk.js.map