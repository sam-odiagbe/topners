(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{128:function(e,a,t){e.exports=t(259)},133:function(e,a,t){},134:function(e,a,t){},158:function(e,a){},160:function(e,a){},199:function(e,a){},200:function(e,a){},258:function(e,a,t){},259:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),i=t(50),r=t.n(i),o=(t(133),t(134),t(19)),c=t(28),s=t(23),u=t(24),d=t(26),p=t(25),m=t(10),h=t(27),v=t(7),E=t(3),b=t(42),g=t.n(b),f=function(e){return console.log("loggin in ",e),{type:"LOGING-IN-COMP",payload:e}},N=function(e){return{type:"SIGNING-UP-COMP",payload:e}},O=t(125),y="https://topner.herokuapp.com/",I=(t(256),function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(d.a)(this,Object(p.a)(a).call(this))).handleInputChange=e.handleInputChange.bind(Object(m.a)(e)),e.validateField=e.validateField.bind(Object(m.a)(e)),e.createUserAccount=e.createUserAccount.bind(Object(m.a)(e)),e}return Object(h.a)(a,e),Object(u.a)(a,[{key:"handleInputChange",value:function(e){var a=e.target,t=a.id,n=a.value;this.props.signupInputAction({id:t,value:n}),this.props.signupInputValidation({id:t,value:n})}},{key:"validateField",value:function(e){var a=e.target,t=a.id,n=a.value;this.props.signupInputValidation({id:t,value:n})}},{key:"createUserAccount",value:function(e){e.preventDefault(),this.props.createUserAccount(this.props.signup_input_data)}},{key:"render",value:function(){var e=this.props,a=e.signup_input_data,t=e.validation,n=e.error,i=e.auth,r=e.signingup,o=a.name,s=a.email,u=a.username,d=a.password,p=a.bank,m=a.account_number,h=a.confirm_password,v=t.name,E=t.email,b=t.username,g=t.password,f=t.bank,N=t.account_number,O=t.confirm_password,y=t.validField,I=n.error,w=(y.includes(!1),r?l.a.createElement("button",{className:"tp-auth-btn",disabled:!0},l.a.createElement("i",{className:"fas fa-circle-notch fa-spin"})," Creating account..."):l.a.createElement("button",{className:"tp-auth-btn",disabled:!1},"Create Account"));return i?l.a.createElement(c.a,{to:"/dashboard"}):l.a.createElement("div",{className:"tp-auth-container"},l.a.createElement("h2",{className:"tp-auth-title"},"Sign up"),I&&l.a.createElement("p",{className:"tp-field-error"},I),l.a.createElement("form",{onSubmit:this.createUserAccount},l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"name"},"Fullname"),l.a.createElement("input",{type:"text",className:"tp-input-field ".concat(v?"":"tp-invalid-field"),placeholder:"John Doe",id:"name",required:!0,value:o,onChange:this.handleInputChange,onBlur:this.validateField}),l.a.createElement("p",{className:"tp-form-note"},"* Name must match the name in your bank account"),!v&&l.a.createElement("p",{className:"tp-field-error"},"*field is not valid")),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"email"},"Email"),l.a.createElement("input",{type:"email",placeholder:"Email",className:"tp-input-field ".concat(E?"":"tp-invalid-field"),id:"email",required:!0,value:s,onChange:this.handleInputChange,onBlur:this.validateField}),!E&&l.a.createElement("p",{className:"tp-field-error"},"*email is not valid")),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"username"},"Username"),l.a.createElement("input",{type:"text",className:"tp-input-field ".concat(b?"":"tp-invalid-field"),placeholder:"Username",id:"username",required:!0,value:u,onChange:this.handleInputChange,onBlur:this.validateField}),l.a.createElement("p",{className:"tp-form-note"},"* Username can only have letters and _"),!b&&l.a.createElement("p",{className:"tp-field-error"},"*Username can contain only letters and _")),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"bank"},"Bank Name"),l.a.createElement("select",{id:"bank",className:"tp-input-field ".concat(f?"":"tp-invalid-field"),required:!0,value:p,onChange:this.handleInputChange,onBlur:this.validateField},l.a.createElement("option",{disabled:!0},"Select your bank"),l.a.createElement("option",null,"Firstbank"),l.a.createElement("option",null,"UBA"),l.a.createElement("option",null,"Access Bank"),l.a.createElement("option",null,"Polaris Bank"),l.a.createElement("option",null,"Fidelity Bank"),l.a.createElement("option",null,"GTB"),l.a.createElement("option",null,"Eco Bank")),!f&&l.a.createElement("p",{className:"tp-field-error"},"*field is not valid")),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"account_number"},"Account Number"),l.a.createElement("input",{type:"text",className:"tp-input-field ".concat(N?"":"tp-invalid-field"),placeholder:"Account Number",id:"account_number",required:!0,value:m,onChange:this.handleInputChange,onBlur:this.validateField}),l.a.createElement("p",{className:"tp-form-note"},"* Name in account must match name provided above"),!N&&l.a.createElement("p",{className:"tp-field-error"},"* Account should be numbers and not more or less than ten in length")),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"password"},"Password"),l.a.createElement("input",{type:"password",className:"tp-input-field ".concat(g?"":"tp-invalid-field"),placeholder:"Password",id:"password",required:!0,value:d,onChange:this.handleInputChange,onBlur:this.validateField}),l.a.createElement("div",{className:"tp-form-note"},l.a.createElement("p",null,"* must have an uppercase"),l.a.createElement("p",null,"* must have a lowercase"),l.a.createElement("p",null,"* must have a number"),l.a.createElement("p",null,"* must have any of this #$^+=!*()@%&")),!g&&l.a.createElement("p",{className:"tp-field-error"},"*password must contain numbers,lowercase, uppercas, any of this [@#$%..]")),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"confirm_password"},"Confirm Password"),l.a.createElement("input",{type:"password",className:"tp-input-field ".concat(O?"":"tp-invalid-field"),placeholder:"Confirm Password",id:"confirm_password",required:!0,value:h,onChange:this.handleInputChange,onBlur:this.validateField}),!O&&l.a.createElement("p",{className:"tp-field-error"},"*passwords do not match")),l.a.createElement("div",null,w)))}}]),a}(n.Component)),w=Object(v.b)(function(e){return{signup_input_data:e.input.signup,validation:e.validation.signup,error:e.error.signup,auth:e.auth.user,signingup:e.components.signingup}},function(e){return{signupInputAction:function(a){e(function(e){return{type:"SIGNUP_INPUT",payload:e}}(a))},signupInputValidation:function(a){e(function(e){return function(a,t){var n,l=e.id,i=e.value,r={type:"SIGNUP-VALIDATION",payload:{id:l,valid:null}};switch(l){case"name":n=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(i),r=Object(E.a)({},r,{payload:{id:l,valid:n,index:0}});break;case"email":n=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(i),r=Object(E.a)({},r,{payload:{id:l,valid:n,index:1}});break;case"password":a({type:"SIGNUP-VALIDATION",payload:{id:"confirm_password",valid:t().input.signup.confirm_password===i,index:5}}),n=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/.test(i),r=Object(E.a)({},r,{payload:{id:l,valid:n,index:5}});break;case"bank":n=["Firstbank","GTB","Polaris Bank","Access Bank","UBA","Fidelity Bank","Eco Bank"].includes(i),r=Object(E.a)({},r,{payload:{id:l,valid:n,index:3}});break;case"account_number":n=/^[0-9]{10}$/.test(i),r=Object(E.a)({},r,{payload:{id:l,valid:n,index:4}});break;case"confirm_password":n=i===t().input.signup.password,r=Object(E.a)({},r,{payload:{id:l,valid:n,index:6}});break;case"username":var o={id:l,valid:n=/^[a-z0-9-_A-Z]{6,30}$/.test(i),index:2};r=Object(E.a)({},r,{payload:o})}a(r)}}(a))},createUserAccount:function(a){e(function(e){return function(a){a(N(!0)),g.a.post("".concat(y,"auth/signup"),e).then(function(e){console.log(e.data);var t=e.data,n=t.error,l=t.success;a(n?{type:"SIGNUP-ERROR",payload:{error:n.message,success:null}}:{type:"SIGNUP-SUCCESS",payload:{error:null,success:l.message}}),a(N(!1))}).catch(function(e){a({type:"SIGNUP-ERROR",payload:e.message}),a(N(!1))})}}(a))}}})(I),A=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(d.a)(this,Object(p.a)(a).call(this))).handleInputChange=e.handleInputChange.bind(Object(m.a)(e)),e.validateField=e.validateField.bind(Object(m.a)(e)),e.logUserIn=e.logUserIn.bind(Object(m.a)(e)),e}return Object(h.a)(a,e),Object(u.a)(a,[{key:"handleInputChange",value:function(e){var a=e.target,t=a.id,n=a.value;this.props.loginInputAction({id:t,value:n})}},{key:"validateField",value:function(e){}},{key:"logUserIn",value:function(e){e.preventDefault(),this.props.loguserin(this.props.login_input_data)}},{key:"render",value:function(){var e=this.props,a=e.login_input_data,t=e.validation,n=e.auth,i=e.error,r=e.logingin;console.log(r);var s=a.email,u=a.password,d=t.email,p=(t.validfield,i.error),m=r?l.a.createElement("button",{className:"tp-auth-btn",disabled:!0},l.a.createElement("i",{className:"fas fa-circle-notch fa-spin"})," Loging in..."):l.a.createElement("button",{className:"tp-auth-btn",disabled:!1},"Log in");return n?l.a.createElement(c.a,{to:"/dashboard"}):l.a.createElement("div",{className:"tp-auth-container"},l.a.createElement("h2",{className:"tp-auth-title"},"Login"),p&&l.a.createElement("p",{className:"tp-field-error"},p),l.a.createElement("form",{onSubmit:this.logUserIn},l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"email"},"Email"),l.a.createElement("input",{type:"email",id:"email",placeholder:"Email",required:!0,className:"tp-input-field ".concat(d?"":"tp-invalid-field"),value:s,onChange:this.handleInputChange,onBlur:this.validateField}),!d&&l.a.createElement("p",{className:"tp-field-error"},"* email is invalid")),l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"password"},"Password"),l.a.createElement("input",{type:"password",id:"password",placeholder:"password",required:!0,className:"tp-input-field",value:u,onChange:this.handleInputChange})),l.a.createElement("div",null,m),l.a.createElement("div",null,l.a.createElement("p",null,l.a.createElement(o.b,{to:"/auth/password-reset",className:"tp-forgot-password"},"Forgot Password")))))}}]),a}(n.Component),j=Object(v.b)(function(e){return{login_input_data:e.input.login,validation:e.validation.login,auth:e.auth.user,error:e.error.login,logingin:e.components.logingin}},function(e){return{loginInputAction:function(a){e(function(e){return{type:"LOGIN_INPUT",payload:e}}(a))},loginValidation:function(a){e({type:"LOGIN-VALIDATION",payload:{valid:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)}})},loguserin:function(a){return e(function(e){return function(a){a(f(!0)),g.a.post("".concat(y,"auth/login"),e,{withCredentials:!0}).then(function(e){var t=e.data,n=t.error,l=t.success;if(n)a({type:"LOGIN-ERROR",payload:{error:n}});else{var i=O.verify(l.auth,"posiedonathenazeuskratoshydra");a({type:"SET-ACTIVE-USER",payload:{user:i.auth}}),a(f(!1))}}).catch(function(e){console.log(e),a({type:"LOGIN-ERROR",payload:{error:"Invalid credentials provided"}}),a(f(!1))})}}(a))}}})(A),k=function(e){function a(){var e;return Object(s.a)(this,a),(e=Object(d.a)(this,Object(p.a)(a).call(this))).handleInputChange=e.handleInputChange.bind(Object(m.a)(e)),e.validateField=e.validateField.bind(Object(m.a)(e)),e}return Object(h.a)(a,e),Object(u.a)(a,[{key:"handleInputChange",value:function(e){var a=e.target,t=a.id,n=a.value;this.props.passwordResetInputAction({id:t,value:n}),this.props.passwordResetValidation(n)}},{key:"validateField",value:function(e){this.props.passwordResetValidation(e.target.value)}},{key:"render",value:function(){var e=this.props,a=e.validation,t=e.resetpassword_input_data.email,n=a.email,i=a.validfield;return l.a.createElement("div",{className:"tp-auth-container"},l.a.createElement("h2",{className:"tp-auth-title"},"Password Reset"),l.a.createElement("form",null,l.a.createElement("div",null,l.a.createElement("label",{htmlFor:"email"},"Email"),l.a.createElement("input",{type:"email",placeholder:"email",id:"email",required:!0,className:"tp-input-field ".concat(n?"":"tp-invalid-field"),value:t,onChange:this.handleInputChange,onBlur:this.validateField}),!n&&l.a.createElement("p",{className:"tp-field-error"},"* email is not valid")),l.a.createElement("div",null,l.a.createElement("button",{className:"tp-auth-btn",disabled:!i},"Send reset link"))))}}]),a}(n.Component),C=Object(v.b)(function(e){return{resetpassword_input_data:e.input.resetpassword,validation:e.validation.passwordreset}},function(e){return{passwordResetInputAction:function(a){e(function(e){return{type:"PASSWORD_RESET_INPUT",payload:e}}(a))},passwordResetValidation:function(a){e({type:"PASSWORD-RESET-VALIDATION",payload:{valid:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)}})}}})(k),_=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("li",null,l.a.createElement(o.c,{activeClassName:"tp-active-link-class",exact:!0,to:"/auth/login"},"Login")),l.a.createElement("li",null,l.a.createElement(o.c,{activeClassName:"tp-active-link-class",exact:!0,to:"/auth/signup"},"Signup")))},F=Object(v.b)(null,function(e){return{loguserout:function(a){return a.preventDefault(),e(function(e){g.a.post("".concat(y,"auth/logout"),{},{withCredentials:!0}).then(function(a){var t=a.data,n=t.error;t.success,n||e({type:"SET-ACTIVE-USER",payload:{user:null}})})})}}})(function(e){var a=e.user,t=e.loguserout;return l.a.createElement(l.a.Fragment,null,l.a.createElement("li",null,l.a.createElement("div",{className:"tp-initials"},l.a.createElement("span",null,a.username[0]))),l.a.createElement("li",null,l.a.createElement("a",{href:"javascript:void(0)",onClick:t},"logout")))}),U=function(e){var a=e.user;console.log(a);var t=a?l.a.createElement(F,{user:a}):l.a.createElement(_,null);return l.a.createElement("nav",{className:"tp-navigation"},l.a.createElement("a",{href:"#default",className:"tp-brand"},"Topners"),l.a.createElement("ul",null,t))},S=(t(258),function(e){function a(){return Object(s.a)(this,a),Object(d.a)(this,Object(p.a)(a).call(this))}return Object(h.a)(a,e),Object(u.a)(a,[{key:"render",value:function(){var e=this.props.user,a=e||{},t=a.username;a.id;return console.log(e),e?l.a.createElement("div",{className:"tp-main-container"},l.a.createElement("div",{className:"tp-user-header"},l.a.createElement("h4",null,"hi, ",t),l.a.createElement("div",null,l.a.createElement("h4",null,"\u20a6",500..toFixed(1)),l.a.createElement("button",{className:"tp-top-up-account"},"Deposit"))),l.a.createElement("div",{className:"tp-question-container"},l.a.createElement("p",{className:"tp-form-note"},"! When you are signed up for a game, and question is available for answering , it will appear here")),l.a.createElement("div",{className:"tp-card-container"},l.a.createElement("div",{className:"tp-card"},l.a.createElement("div",{className:"tp-card-top"},l.a.createElement("h1",null,"Bronze")),l.a.createElement("div",{className:"tp-card-bottom"},l.a.createElement("div",{className:"tp-entrance-fee"},l.a.createElement("h4",null,"Entrance fee"),l.a.createElement("h4",null,"\u20a6100")),l.a.createElement("div",{className:"tp-possible-win"},l.a.createElement("h4",null,"Win"),l.a.createElement("h4",null,"upto 100k")),l.a.createElement("div",{className:"tp-enter-context"},l.a.createElement("button",{className:"tp-enter-context-btn"},"Enter bronze")))))):l.a.createElement(c.a,{to:"/auth/login"})}}]),a}(n.Component)),T=Object(v.b)(function(e){return{user:e.auth.user}})(S),R=function(){return l.a.createElement("div",{className:"tp-loader-container"},l.a.createElement("h1",null,"Hold on hoss checking authentication status"),l.a.createElement("p",null,"Wait a little bit......"))};var P=Object(v.b)(function(e){return{loading:e.auth.loading,user:e.auth.user}})(function(e){var a=e.loading,t=e.user;return a?l.a.createElement(R,null):l.a.createElement(o.a,null,l.a.createElement("div",{className:"App"},l.a.createElement(U,{user:t}),l.a.createElement(c.d,null,l.a.createElement(c.b,{path:"/auth/signup",exact:!0,component:w}),l.a.createElement(c.b,{path:"/auth/login",exact:!0,component:j}),l.a.createElement(c.b,{path:"/dashboard",exact:!0,component:T}),l.a.createElement(c.b,{path:"/auth/password-reset",exact:!0,component:C}))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var z=t(30),Z=t(21),B={login:{email:"",password:""},resetpassword:{email:""},signup:{name:"",email:"",username:"",bank:"Select your bank",account_number:"",password:"",confirm_password:""}},G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,a=arguments.length>1?arguments[1]:void 0,t=a.payload?a.payload:{},n=t.id,l=t.value;switch(a.type){case"LOGIN_INPUT":var i=Object(E.a)({},e.login,Object(Z.a)({},n,l));e=Object(E.a)({},e,{login:i});break;case"SIGNUP_INPUT":var r=Object(E.a)({},e.signup,Object(Z.a)({},n,l));e=Object(E.a)({},e,{signup:r});break;case"PASSWORD_RESET_INPUT":var o=Object(E.a)({},e.resetpassword,Object(Z.a)({},n,l));e=Object(E.a)({},e,{resetpassword:o})}return e},x={signup:{name:!0,email:!0,password:!0,bank:!0,account_number:!0,confirm_password:!0,username:!0,validField:[!1,!1,!1,!1,!1,!1,!1]},login:{email:!0,validfield:!1},passwordreset:{email:!0,validfield:!1}},D=function(){var e,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0,n=t.payload?t.payload:{},l=n.id,i=n.valid,r=n.index;switch(t.type){case"SIGNUP-VALIDATION":var o=a.signup.validField;o[r]=i;var c=Object(E.a)({},a.signup,(e={},Object(Z.a)(e,l,i),Object(Z.a)(e,"validField",o),e));a=Object(E.a)({},a,{signup:c});break;case"LOGIN-VALIDATION":var s=Object(E.a)({},a.login,{email:i,validfield:i});a=Object(E.a)({},a,{login:s});break;case"PASSWORD-RESET-VALIDATION":var u=Object(E.a)({},a.passwordreset,{email:i,validfield:i});a=Object(E.a)({},a,{passwordreset:u})}return a},L={signup:{error:null,success:null},login:{error:null}},V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,a=arguments.length>1?arguments[1]:void 0,t=a.payload||{},n=t.error,l=t.success;switch(a.type){case"SIGNUP-ERROR":var i={error:n,success:l};e=Object(E.a)({},e,{signup:i});break;case"LOGIN-ERROR":console.log(n);var r={error:n};e=Object(E.a)({},e,{login:r})}return e},$={loading:!0,user:null},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,a=arguments.length>1?arguments[1]:void 0,t=a.payload?a.payload:{},n=t.loading,l=t.user;switch(a.type){case"AUTHENTICATION-END":e=Object(E.a)({},e,{loading:n,user:l});break;case"SET-ACTIVE-USER":console.log(l),e=Object(E.a)({},e,{user:l})}return e},W={logingin:!1,signingup:!1},H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,a=arguments.length>1?arguments[1]:void 0;switch(console.log("what happened ",a.payload),a.type){case"LOGIN-IN-COMP":e=Object(E.a)({},(void 0).state,{logingin:a.payload});break;case"SIGNING-UP-COMP":e=Object(E.a)({},(void 0).state,{signingup:a.payload})}return e},M=Object(z.c)({input:G,validation:D,error:V,auth:q,components:H}),J=t(127),K=Object(z.d)(M,Object(z.a)(J.a));K.dispatch(function(e){g.a.get("".concat(y,"auth/verify_authentication"),{withCredentials:!0}).then(function(a){var t=a.data,n=t.error,l=t.success;console.log(a.data),e(n?{type:"AUTHENTICATION-END",payload:{loading:!1,user:null}}:{type:"AUTHENTICATION-END",payload:{loading:!1,user:l.auth}})}).catch(function(a){e({type:"AUTHENTICATION-END",payload:{loading:!1,user:null}})})}),r.a.render(l.a.createElement(v.a,{store:K},l.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[128,1,2]]]);
//# sourceMappingURL=main.298bd729.chunk.js.map