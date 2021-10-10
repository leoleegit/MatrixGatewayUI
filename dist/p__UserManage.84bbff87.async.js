(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[140],{52790:function(we,N,a){"use strict";a.r(N),a.d(N,{default:function(){return oe}});var Pe=a(57663),v=a(71577),D=a(8870),pe=a(49111),A=a(19650),V=a(3182),ke=a(34792),h=a(48086),f=a(2824),Oe=a(71194),J=a(5644),X=a(94043),I=a.n(X),q=a(49101),o=a(67294),_=a(86353),ee=a(70844),be=a(57338),L=a(25084),Fe=a(13062),w=a(71230),Te=a(89032),x=a(15746),Me=a(9715),d=a(82482),Ue=a(47673),g=a(4107),Ee=a(43358),b=a(90290),e=a(85893),B=b.Z.Option,ae=function(n){var m=o.createRef(),Z=function(){n.setShowAdd(!1)};return(0,e.jsx)(L.Z,{visible:n.visible,title:"New User",width:720,onClose:function(){n.setShowAdd(!1)},bodyStyle:{paddingBottom:80},footer:(0,e.jsxs)(A.Z,{children:[(0,e.jsx)(v.Z,{onClick:Z,children:"Cancel"}),(0,e.jsx)(v.Z,{onClick:function(){m.current.submit()},type:"primary",children:"Submit"}),n.drawerData.id&&(0,e.jsx)(v.Z,{onClick:function(){n.delete(n.drawerData.id)},type:"danger",children:"Delete"})]}),closable:!1,maskClosable:!1,destroyOnClose:!0,children:(0,e.jsxs)(d.Z,{ref:m,layout:"vertical",hideRequiredMark:!0,onFinish:n.onSubmit,children:[(0,e.jsxs)(w.Z,{gutter:16,children:[(0,e.jsx)(x.Z,{span:12,children:(0,e.jsx)(d.Z.Item,{name:"username",label:"Username",rules:[{required:!0,message:"Please enter username"}],children:(0,e.jsx)(g.Z,{defaultValue:n.drawerData.username,placeholder:"Please enter username"})})}),(0,e.jsx)(x.Z,{span:12,children:(0,e.jsx)(d.Z.Item,{name:"nickname",label:"Nickname",rules:[{required:!0,message:"Please enter nicknamee"}],children:(0,e.jsx)(g.Z,{defaultValue:n.drawerData.nickname,placeholder:"Please enter nickname"})})})]}),(0,e.jsxs)(w.Z,{gutter:16,children:[(0,e.jsx)(x.Z,{span:12,children:(0,e.jsx)(d.Z.Item,{name:"telephone",label:"Telephone",rules:[{required:!1,message:"Please enter telephone"}],children:(0,e.jsx)(g.Z,{defaultValue:n.drawerData.telephone,placeholder:"Please enter telephone"})})}),(0,e.jsx)(x.Z,{span:12,children:(0,e.jsx)(d.Z.Item,{name:"email",label:"Email",rules:[{required:!1,message:"Please enter email"}],children:(0,e.jsx)(g.Z,{defaultValue:n.drawerData.email,placeholder:"Please enter email"})})})]}),(0,e.jsx)(w.Z,{gutter:16,children:(0,e.jsx)(x.Z,{span:12,children:(0,e.jsx)(d.Z.Item,{name:"sex",label:"Sex",children:(0,e.jsxs)(b.Z,{defaultValue:n.drawerData.sex===0?"Female":"Male",children:[(0,e.jsx)(B,{value:"1",children:"Male"}),(0,e.jsx)(B,{value:"0",children:"Female"})]})})})}),(0,e.jsx)(d.Z.Item,{name:"id",children:(0,e.jsx)(g.Z,{defaultValue:n.drawerData.id,hidden:!0})})]})})},te=ae,re=function(n){var m,Z=(0,o.useState)(),c=(0,f.Z)(Z,2),P=c[0],p=c[1],k=function(){n.setAssignRole(!1),p(void 0)};return(0,e.jsx)(L.Z,{visible:n.visible,title:"Assign Role",width:320,onClose:function(){n.setAssignRole(!1)},bodyStyle:{paddingBottom:80},footer:(0,e.jsxs)(A.Z,{children:[(0,e.jsx)(v.Z,{onClick:k,children:"Cancel"}),(0,e.jsx)(v.Z,{onClick:function(){P?n.onSubmit(P):n.setAssignRole(!1)},type:"primary",children:"Submit"})]}),closable:!1,maskClosable:!1,destroyOnClose:!0,children:(0,e.jsx)(d.Z,{layout:"vertical",hideRequiredMark:!0,children:(0,e.jsx)(w.Z,{gutter:16,children:(0,e.jsx)(x.Z,{span:24,children:(0,e.jsx)(d.Z.Item,{name:"role",label:"Role",initialValue:(m=n.currentRecord)===null||m===void 0?void 0:m.roleName,children:(0,e.jsx)(b.Z,{showSearch:!0,options:n.options,placeholder:"Select a Role",optionFilterProp:"name",onSelect:function(O,R){p(R.title)},filterOption:function(O,R){return R.value.toLowerCase().indexOf(O.toLowerCase())>=0}})})})})})})},ne=re,se=a(20851),y=a(2442),le=a(30381),ie=a.n(le),ue=function(){var n=J.Z.confirm,m=(0,o.useState)(!0),Z=(0,f.Z)(m,2),c=Z[0],P=Z[1],p=(0,o.useState)([]),k=(0,f.Z)(p,2),j=k[0],O=k[1],R=(0,o.useState)([]),H=(0,f.Z)(R,2),$=H[0],de=H[1],ce=(0,o.useState)(!1),K=(0,f.Z)(ce,2),z=K[0],fe=K[1],me=(0,o.useState)(!1),G=(0,f.Z)(me,2),ve=G[0],F=G[1],he=(0,o.useState)({}),Q=(0,f.Z)(he,2),xe=Q[0],Ze=Q[1],je=(0,o.useState)(!1),W=(0,f.Z)(je,2),Se=W[0],T=W[1],M=(0,o.useRef)(),ge=function(t){fe(t),T(!0)},ye=function(t){(0,y.KQ)({userId:z.id,roleId:t}).then(function(r){r.code===200?h.default.success("Assign Role Successful"):h.default.error("Assign Role Failure"),T(!1),M.current.reload()})},Re=function(t){n({title:"Reset ".concat(t.username,"'s password"),content:(0,e.jsx)(e.Fragment,{children:"Please confirm reset password"}),okText:"Confirm",onOk:function(){(0,y.ED)({},{id:t.id}).then(function(l){l.code===200?h.default.success("Reset Password Successful"):h.default.error("Reset Password Failure")})}})},Ce=function(){var i=(0,V.Z)(I().mark(function t(){var r;return I().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,(0,y.Uy)({});case 3:if(r=s.sent,r.code!==200){s.next=8;break}if(!r.results){s.next=7;break}return s.abrupt("return",r.results);case 7:return s.abrupt("return",[]);case 8:s.next=13;break;case 10:return s.prev=10,s.t0=s.catch(0),s.abrupt("return",[]);case 13:return s.abrupt("return",[]);case 14:case"end":return s.stop()}},t,null,[[0,10]])}));return function(){return i.apply(this,arguments)}}(),De=[{title:"Avatar",valueType:"avatar",dataIndex:"avatarUrl",key:"avatarUrl",hideInSearch:!0},{title:"Username",dataIndex:"username",key:"username",hideInSearch:!0},{title:"Nickname",dataIndex:"nickname",key:"nickname",hideInSearch:!0},{title:"Telephone",dataIndex:"telephone",key:"telephone"},{title:"Email",dataIndex:"email",key:"email"},{title:"Sex",dataIndex:"sex",key:"sex",hideInSearch:!0,renderFormItem:function(t,r){var l=r.defaultRender;return l(t)},render:function(t,r){return(0,e.jsx)(A.Z,{children:r.sex===1?"Male":"Female"})}},{title:"Role",dataIndex:"roleName",key:"roleName",filters:!0,onFilter:!0,valueType:"select",valueEnum:$},{title:"Update At",dataIndex:"updated_at",key:"updated_at",sorter:!0,valueType:"dateTime",hideInSearch:!0,render:function(t,r){return(0,e.jsx)(e.Fragment,{children:new(ie())(new Date(r.updatedAt)).format("YYYY-MM-DD HH:mm")})}},{title:"Action",valueType:"option",render:function(t,r,l,s){return(0,e.jsxs)(A.Z,{size:"middle",children:[(0,e.jsx)("a",{onClick:function(){ge(r)},children:"Assign Role"}),(0,e.jsx)("a",{onClick:function(){Re(r)},children:"Reset Password"})]})}}],Ae=function(){var i=(0,V.Z)(I().mark(function t(r,l,s){var S,U,E,C;return I().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return S=r,l&&(U=Object.keys(l)[0],E=Object.values(l)[0],U&&E&&(S=(0,D.Z)((0,D.Z)({},S),{},{sortField:U,sort:E==="ascend"?"asc":"desc"}))),u.prev=2,u.next=5,(0,y.Lh)(S);case 5:if(C=u.sent,C.code!==200){u.next=9;break}if(!C.results){u.next=9;break}return u.abrupt("return",{data:C.results,success:!0,total:C.count});case 9:u.next=14;break;case 11:return u.prev=11,u.t0=u.catch(2),u.abrupt("return",{});case 14:return u.abrupt("return",{data:[],success:!0,total:0});case 15:case"end":return u.stop()}},t,null,[[2,11]])}));return function(r,l,s){return i.apply(this,arguments)}}(),Ie=function(t){var r=t.sex===0?0:1;(0,y.r4)((0,D.Z)((0,D.Z)({},t),{},{sex:r})).then(function(l){l.code===200?h.default.success("Create User Successful"):h.default.error(l.msg),F(!1),M.current.reload()})};return(0,o.useEffect)(function(){c&&Ce().then(function(i){P(!1);var t={},r=[];i.forEach(function(l){t[l.name]={text:l.name},r.push({title:l.id,value:l.name})}),de(t),O(r)})},[c]),(0,e.jsxs)(ee.ZP,{children:[(0,e.jsx)(se.ZP,{headerTitle:!1,actionRef:M,rowKey:"id",search:{labelWidth:120},toolBarRender:function(){return[(0,e.jsxs)(v.Z,{type:"primary",onClick:function(){Ze({}),F(!0)},children:[(0,e.jsx)(q.Z,{})," ",(0,e.jsx)(_._H,{id:"pages.userManage.new",defaultMessage:"New"})]},"primary")]},request:Ae,columns:De}),(0,e.jsx)(te,{setShowAdd:function(){F(!1)},visible:ve,drawerData:xe,onSubmit:Ie}),(0,e.jsx)(ne,{roleData:$,setAssignRole:function(){T(!1)},visible:Se,currentRecord:z,options:j,onSubmit:ye})]})},oe=ue}}]);
