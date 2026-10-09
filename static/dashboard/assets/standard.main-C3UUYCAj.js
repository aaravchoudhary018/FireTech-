import{cx as _o,aj as dt,an as Re,ai as We,ak as Ee,am as Ae,aw as Qt,Z as Kt,ay as Je,cy as uo,cz as Jt,G as fo,cA as Bt,bc as pt,cB as et,X as F,cC as mo,c as X,cD as ho,aG as po,cE as Nt,cF as go,be as tt,cG as V,M as qe,ba as gt,aD as vo,m as _e,y as ae,_ as xe,E as jt,U as ve,cH as ot,cq as Ce,cI as xo,bY as je,cr as wt,bW as yo,cJ as bo,cK as wo,cL as To,i as Mo,cM as Tt,b9 as Mt,cN as St,p as So,cb as Ro,b2 as eo,cO as ye,az as Eo,cP as Ao,cQ as Co,cR as vt,cS as to,aU as Ze,cT as Fo,cU as Oo,cV as Do,cW as Po,bl as ce,l as No,cu as Io,cc as Lo,cX as zo,aY as Uo,co as It,cY as oo,c5 as Bo,c6 as Go,cd as Ho,cZ as ao,c_ as Vo,cn as qo,c$ as jo,d0 as ct,d1 as Ye,d2 as Xo,aA as Xt,d3 as ko,d4 as $o,d5 as Wo,d6 as Zo,ap as Yo,Y as Qo,ar as Ko,z as Jo,F as ea,b4 as Rt,d7 as ta,d8 as oa}from"./mapbox-gl-aOqpErma.js";import{_ as aa,e as Et,q as Lt,Q as At,K as ia,P as ra,T as na,t as sa,$ as la}from"./hd_standard.model-BLoB5p4s.js";import{k as da}from"./standard.shared-BrBpCTvH.js";import{d as ca,f as _a}from"./hd_standard.shared-t5VyPkg5.js";import"./index-CbfOwvWt.js";const zt=new Float32Array(oo([])),kt=[0,0,0],Gt=(e,o,t,a,i,n,r,l,d,c,m,u,_,f=[0,0,0],g,p,x,y=1,v=!1)=>{let b=kt,s=0,T=kt;if(!v){const S=i.style.light,E=S.properties.get("position");if(b=[-E.x,-E.y,E.z],S.properties.get("anchor")==="viewport"){const I=$o();Wo(I,-i.transform.angle),Zo(b,b,I)}const M=S.properties.get("color").toNonPremultipliedRenderColor(null);s=S.properties.get("intensity"),T=[M.r,M.g,M.b]}const h=m.alphaMode==="MASK",A=_.paint.get("model-ambient-occlusion-intensity"),w=_.paint.get("model-color").constantOr(qe.white).toNonPremultipliedRenderColor(null);return w.a=_.paint.get("model-color-mix-intensity").constantOr(0),x&&(w.r=x[0],w.g=x[1],w.b=x[2],w.a=x[3]),p&&(w.r=p.color.r,w.g=p.color.g,w.b=p.color.b,w.a=p.colorMix,u=p.emissionStrength,n*=p.opacity),{u_matrix:e,u_lighting_matrix:o,u_normal_matrix:t,u_node_matrix:a||zt,u_lightpos:b,u_lightintensity:s,u_lightcolor:T,u_camera_pos:f,u_opacity:n,u_baseTextureIsAlpha:0,u_alphaMask:+h,u_alphaCutoff:m.alphaCutoff,u_baseColorFactor:r.toNonPremultipliedRenderColor(null).toArray01(),u_emissiveFactor:l.toNonPremultipliedRenderColor(null).toArray01(),u_metallicFactor:d,u_roughnessFactor:c,u_baseColorTexture:V.BaseColor,u_metallicRoughnessTexture:V.MetallicRoughness,u_normalTexture:V.Normal,u_occlusionTexture:V.Occlusion,u_emissionTexture:V.Emission,u_lutTexture:V.LUT,u_color_mix:w.toArray01(),u_aoIntensity:A,u_emissive_strength:u,u_occlusionTextureTransform:g||[0,0,0,0],u_dithered_discard_threshold:y,u_model_mesh_params:[0,1,0,0]}},io=(e,o=zt,t=zt)=>({u_matrix:e,u_instance:o,u_node_matrix:t});function Ct(e,o,t,a){const i=1<<e.z;o.lat=Do((a/ve+e.y)/i),o.lng=Po((t/ve+e.x)/i)}const de=new Float64Array(16),Fe=new Float64Array(16),ro=new Float64Array(16),Ft=new Float64Array(16),Ot=new Float64Array(16),_t=new Float64Array(16),ua=new Float64Array(16),ut=[0,0,0],fa=new Float32Array(16),ft=[0,0,0],ma=[0,0,0],Dt=[];function no(e,o,t){const a=t.cameraWorldSizeForFog/t.worldSize;return pt(e,t.worldToFogMatrix,[a,a,1]),F(e,e,o),e}function Qe(e,o,t,a){return Bt(e,o,t),qo(a,la)||pt(e,e,a),e}function ha(e,o,t,a){const i=t?o.lightsStyleAabb:e.aabb,n=i?i.min[2]:1/0,r=(i?i.max[2]:-1/0)-n;return[isFinite(n)?n:0,r>0&&isFinite(r)?r:1,a?1:0,0]}function pa(e,o){return o.featureBuffer?e.partStyleUBO:null}function Ht(e,o,t,a,i,n=null){const r=t.material,l=a.context,{baseColorTexture:d,metallicRoughnessTexture:c}=r.pbrMetallicRoughness,{normalTexture:m,occlusionTexture:u,emissionTexture:_}=r;function f(p,x,y){if(p&&(e.push(x),l.activeTexture.set(l.gl.TEXTURE0+y),p.gfxTexture)){const{minFilter:v,magFilter:b,wrapS:s,wrapT:T}=p.sampler;p.gfxTexture.bindExtraParam(v,b,s,T)}}f(d,"HAS_TEXTURE_u_baseColorTexture",V.BaseColor),f(c,"HAS_TEXTURE_u_metallicRoughnessTexture",V.MetallicRoughness),f(m,"HAS_TEXTURE_u_normalTexture",V.Normal),f(u,"HAS_TEXTURE_u_occlusionTexture",V.Occlusion),f(_,"HAS_TEXTURE_u_emissionTexture",V.Emission),i&&(i.texture||(i.texture=new ko(a.context,i.image,[i.image.height,i.image.height,i.image.height],l.gl.RGBA8)),l.activeTexture.set(l.gl.TEXTURE0+V.LUT),i.texture&&i.texture.bind(l.gl.LINEAR,l.gl.CLAMP_TO_EDGE),e.push("APPLY_LUT_ON_GPU")),t.texcoordBuffer&&(e.push("HAS_ATTRIBUTE_a_uv_2f"),o.push(t.texcoordBuffer)),t.colorBuffer&&(e.push(t.colorBuffer.itemSize===12?"HAS_ATTRIBUTE_a_color_3f":"HAS_ATTRIBUTE_a_color_4f"),o.push(t.colorBuffer)),t.normalBuffer&&(e.push("HAS_ATTRIBUTE_a_normal_4n"),o.push(t.normalBuffer)),n&&(e.push("HAS_ATTRIBUTE_a_feature"),o.push(t.featureBuffer)),r.alphaMode!=="OPAQUE"&&r.alphaMode!=="MASK"||e.push("UNPREMULT_TEXTURE_IN_SHADER"),r.defined||e.push("DIFFUSE_SHADED");const g=a.shadowRenderer;g&&(e.push("RENDER_SHADOWS"),g.useNormalOffset&&e.push("NORMAL_OFFSET"))}function Pt(e,o,t,a,i,n){const r=e.modelOpacity,l=o.context,d=new X(o.context.gl.LEQUAL,e.isLightMesh?X.ReadOnly:X.ReadWrite,o.depthRangeFor3D),c=o.transform,m=e.mesh,u=m.material,_=u.pbrMetallicRoughness,f=o.style.fog;o.transform.projection.zAxisUnit==="pixels"?de.set(e.nodeModelMatrix):F(de,a.zScaleMatrix,e.nodeModelMatrix),F(de,a.negCameraPosMatrix,de),tt(Fe,de),eo(Fe,Fe);const g=t.paint.get("model-color-use-theme").constantOr("default")==="none",p=t.paint.get("model-emissive-strength").constantOr(0),x={defines:[]},y=[],v=o.shadowRenderer;v&&(v.useNormalOffset=!1),Ht(x.defines,y,m,o,g?null:t.lut);let b=null;if(f&&(b=no(ro,e.nodeModelMatrix,o.transform),c.projection.name!=="globe")){const A=m.aabb.min,w=m.aabb.max,[S,E]=f.getOpacityForBounds(b,A[0],A[1],w[0],w[1]);x.overrideFog=S>=vt||E>=vt}const s=gt(o,t.paint.get("model-cutoff-fade-range"));s.shouldRenderCutoff&&x.defines.push("RENDER_CUTOFF");const T=o.getOrCreateProgram("model",x),h=Gt(e.worldViewProjection,de,Fe,null,o,r,_.baseColorFactor,u.emissiveFactor,_.metallicFactor,_.roughnessFactor,u,p,t,void 0,void 0,e.materialOverride,e.modelColor,1,T.fixedDefines.includes("LIGHTING_3D_MODE"));o.uploadCommonUniforms(l,T,null,b,s,e.lightOverrides),o.renderPass!=="shadow"&&v&&v.setupShadowsFromMatrix(e.nodeModelMatrix,T),T.draw(o,l.gl.TRIANGLES,d,i,n,m.material.doubleSided?xe.disabled:xe.backCCW,h,t.id,m.vertexBuffer,m.indexBuffer,m.segments,t.paint,o.transform.zoom,void 0,y)}function $t(e,o){return e.style._importedAsBasemap?"basemap":o.scope}function Ut(e,o,t,a,i,n,r,l,d,c,m){const u=e.transform,_=!!o.isGeometryBloom&&o.isGeometryBloom;if(o.minZoom!==void 0&&e.transform.zoom<o.minZoom||o.maxZoom!==void 0&&e.transform.zoom>o.maxZoom||_&&e.renderPass==="shadow")return;const f=u.projection.name==="globe"?Lt(t,u):[...t];F(f,f,o.globalMatrix);const g=F([],a,f);if(o.meshes)for(const p of o.meshes){const x=l.get(p.material.name);if(x&&x.opacity<=0)continue;if(p.material.alphaMode!=="BLEND"){r.push({mesh:p,depth:0,modelIndex:i,worldViewProjection:g,nodeModelMatrix:f,isLightMesh:_,materialOverride:x,modelOpacity:d,modelColor:c,lightOverrides:m,node:o,modelMatrix:t});continue}const y=ye([],p.centroid,g);!u.isOrthographic&&y[2]<=0||n.push({mesh:p,depth:y[2],modelIndex:i,worldViewProjection:g,nodeModelMatrix:f,isLightMesh:_,materialOverride:x,modelOpacity:d,modelColor:c,lightOverrides:m,node:o,modelMatrix:t})}if(o.children)for(const p of o.children)Ut(e,p,t,a,i,n,r,l,d,c,m)}function Ke(e,o,t,a,i){const n=t.shadowRenderer;if(!n)return;const r=n.getShadowPassDepthMode(),l=i||n.calculateShadowPassMatrixFromMatrix(o),d=io(l);t.getOrCreateProgram("modelDepth").draw(t,t.context.gl.TRIANGLES,r,_e.disabled,ae.disabled,xe.disabled,d,a.id,e.vertexBuffer,e.indexBuffer,e.segments,a.paint,t.transform.zoom,void 0,void 0)}function Wt(e,o,t,a){const i=(function(m,u){if(u.footprintDebugMesh)return u.footprintDebugMesh;if(!u.footprint)return null;const _=m.context,f=u.footprint.vertices,g=u.footprint.indices,p=new Yo;p.reserve(f.length);for(const E of f)p.emplaceBack(E.x,E.y);const x=new Qo;x.reserve(g.length);for(let E=0;E<g.length;E+=3)x.emplaceBack(g[E],g[E+1],g[E+2]);const y=_.createVertexBuffer(p,Ko.members),v=_.createIndexBuffer(x),b=Jo.simpleSegment(0,0,f.length,g.length),s=u.id||u.name||"footprint";let T;const h=parseInt(s,10);T=isNaN(h)?(function(E){let M=0;for(let I=0;I<E.length;I++)M=(M<<5)-M+E.charCodeAt(I)|0;return M})(s):h;const A=Rt(T),w=Rt(T+1),S=Rt(T+2);return u.footprintDebugMesh={vertexBuffer:y,indexBuffer:v,segments:b,color:new qe(A,w,S,.5)},u.footprintDebugMesh})(e,t);if(!i)return;const n=e.context,r=n.gl,l=e.getOrCreateProgram("debug"),d=i.color,c=X.disabled;n.activeTexture.set(r.TEXTURE0),e.emptyTexture.bind(r.LINEAR,r.CLAMP_TO_EDGE),l.draw(e,r.TRIANGLES,c,_e.disabled,ae.alphaBlended,xe.disabled,ea(a,d.toPremultipliedRenderColor(null)),"$debug",i.vertexBuffer,i.indexBuffer,i.segments)}function ga(e,o,t,a,i,n){for(const r of i){const l={...a};l.part=r;const d={type:"Unknown",id:o,properties:l},c={orientation:e.paint.get("model-rotation").evaluate(d,t)};n.set(r,c)}}function va(e,o,t,a,i,n){for(const r of i){const l={...a};l.part=r;const d={type:"Unknown",id:o,properties:l},c={color:e.paint.get("model-color").evaluate(d,t),colorMix:e.paint.get("model-color-mix-intensity").evaluate(d,t),opacity:e.paint.get("model-opacity").evaluate(d,t),emissionStrength:e.paint.get("model-emissive-strength").evaluate(d,t)};n.set(r,c)}}function Zt(e,o,t,a,i){let n=!1;for(const l of a)l.modelOpacity!==1&&(Pt(l,e,o,i[l.modelIndex],_e.disabled,ae.disabled),n=!0);for(const l of a)Pt(l,e,o,i[l.modelIndex],l.modelOpacity!==1?e.stencilModeFor3D():_e.disabled,e.colorModeForRenderPass());n&&e.resetStencilClippingMasks();const r=ae.additive;for(const l of t)Pt(l,e,o,i[l.modelIndex],_e.disabled,l.isLightMesh?r:e.colorModeForRenderPass())}function xa(e,o,t){const a=o.updateZoomBasedPaintProperties(),i=(function(n,r,l){let d,c,m,u=n.terrain?n.terrain.exaggeration():0;if(n.terrain&&u>0){const _=n.terrain,f=_.findDEMTileFor(l);f&&f.dem?d=Vo.create(_,l,f):u=0}if(u===0&&(r.terrainElevationMin=0,r.terrainElevationMax=0),u===r.validForExaggeration&&(u===0||d&&d._demTile&&d._demTile.tileID===r.validForDEMTile.id&&d._dem._timestamp===r.validForDEMTile.timestamp))return!1;for(const _ in r.instancesPerModel){const f=r.instancesPerModel[_];for(let g=0;g<f.instancedDataArray.length;++g){const p=(d?u*d.getElevationAt(0|f.instancedDataArray.float32[16*g],0|f.instancedDataArray.float32[16*g+1],!0,!0):0)+f.instancesEvaluatedElevation[g];f.instancedDataArray.float32[16*g+6]=p,c=c?Math.min(r.terrainElevationMin,p):p,m=m?Math.max(r.terrainElevationMax,p):p}}return r.terrainElevationMin=c||0,r.terrainElevationMax=m||0,r.validForExaggeration=u,r.validForDEMTile=d&&d._demTile?{id:d._demTile.tileID,timestamp:d._dem._timestamp}:{id:void 0,timestamp:0},!0})(e,o,t);(a||i)&&(o.uploaded=!1,o.upload(e.context))}const le={shadowUniformsInitialized:!1,useSingleShadowCascade:!1,tileMatrix:new Float64Array(16),shadowTileMatrix:new Float32Array(16),aabb:new ot([0,0,0],[ve,ve,0])};function ya(e,o){const t=1<<e.canonical.z,a=o.getFreeCameraOptions().position,i=o.elevation,n=e.canonical.x/t,r=(e.canonical.x+1)/t,l=e.canonical.y/t,d=(e.canonical.y+1)/t;let c=o._centerAltitude;if(i){const f=i.getMinMaxForTile(e);f&&f.max>c&&(c=f.max)}const m=ce(a.x,n,r)-a.x,u=ce(a.y,l,d)-a.y,_=ao(c,o.center.lat)-a.z;return o._zoomFromMercatorZ(Math.sqrt(m*m+u*u+_*_))}function so(e,o,t,a,i,n,r){const l=e.context,d=e.renderPass==="shadow",c=e.shadowRenderer,m=d&&c?c.getShadowPassDepthMode():new X(l.gl.LEQUAL,X.ReadWrite,e.depthRangeFor3D),u=e.isTileAffectedByFog(n),_=e.transform.projection.name==="globe";if(t.meshes)for(const f of t.meshes){const g=_?[]:["MODEL_POSITION_ON_GPU"],p=[];let x,y,v;const b=!_&&a.instancedDataArray.length>20;b&&g.push("INSTANCED_ARRAYS");const s=gt(e,o.paint.get("model-cutoff-fade-range"));if(s.shouldRenderCutoff&&g.push("RENDER_CUTOFF"),d&&c)x=e.getOrCreateProgram("modelDepth",{defines:g}),y=io(r.shadowTileMatrix,r.shadowTileMatrix,t.globalMatrix),v=ae.disabled;else{Ht(g,p,f,e,o.paint.get("model-color-use-theme").constantOr("default")==="none"?null:o.lut),x=e.getOrCreateProgram("model",{defines:g,overrideFog:u});const h=f.material,A=h.pbrMetallicRoughness,w=o.paint.get("model-opacity").constantOr(1),S=o.paint.get("model-emissive-strength").constantOr(0);y=Gt(n.expandedProjMatrix,t.globalMatrix,fa,null,e,w,A.baseColorFactor,h.emissiveFactor,A.metallicFactor,A.roughnessFactor,h,S,o,i,void 0,void 0,void 0,1,x.fixedDefines.includes("LIGHTING_3D_MODE")),c&&(r.shadowUniformsInitialized?x.setShadowUniformValues(l,c.getShadowUniformValues()):(c.setupShadows(n.toUnwrapped(),x,"model-tile"),r.shadowUniformsInitialized=!0)),v=s.shouldRenderCutoff||w<1||h.alphaMode!=="OPAQUE"?ae.alphaBlended:ae.unblended}e.uploadCommonUniforms(l,x,n.toUnwrapped(),null,s);const T=f.material.doubleSided?xe.disabled:xe.backCCW;if(b)p.push(a.instancedDataBuffer),x.draw(e,l.gl.TRIANGLES,m,_e.disabled,v,T,y,o.id,f.vertexBuffer,f.indexBuffer,f.segments,o.paint,e.transform.zoom,void 0,p,a.instancedDataArray.length);else{const h=d?"u_instance":"u_normal_matrix";for(let A=0;A<a.instancedDataArray.length;++A)y[h]=new Float32Array(a.instancedDataArray.arrayBuffer,64*A,16),x.draw(e,l.gl.TRIANGLES,m,_e.disabled,v,T,y,o.id,f.vertexBuffer,f.indexBuffer,f.segments,o.paint,e.transform.zoom,void 0,p)}}if(t.children)for(const f of t.children)so(e,o,f,a,i,n,r)}function ba(e,o,t,a,i){const n=e.node;if(n.lodMeshes&&n.lodMeshes.length>0)if(e.targetLod<0)e.targetLod=o>a?1:0;else{const r=i>0?t/1e3/i:1;e.targetLod=ce(o>a?e.targetLod+r:e.targetLod-r,0,1)}else e.targetLod=0}function wa(e,o,t,a){if(!t.modelManager)return!0;const i=t.modelManager;if(!t.shadowRenderer)return!0;const n=t.shadowRenderer,r=o.aabb;let l=!0,d=e.maxHeight;if(d===0){let m=0;for(const u in e.instancesPerModel){const _=i.getModel(u,a);_?m=Math.max(m,Math.max(Math.max(_.aabb.max[0],_.aabb.max[1]),_.aabb.max[2])):l=!1}d=e.maxScale*m*1.41+e.maxVerticalOffset,l&&(e.maxHeight=d)}r.max[2]=d,r.min[2]+=e.terrainElevationMin,r.max[2]+=e.terrainElevationMax,ye(r.min,r.min,o.tileMatrix),ye(r.max,r.max,o.tileMatrix);const c=r.intersects(n.getCurrentCascadeFrustum());return t.currentShadowCascade===0&&(e.isInsideFirstShadowMapFrustum=c===2),c===0}function Ta(e,o){const t=e.uniformValues.u_cutoff_params[0],a=e.uniformValues.u_cutoff_params[1],i=e.uniformValues.u_cutoff_params[2],n=e.uniformValues.u_cutoff_params[3];return a===t||n===i?1:ce(((o-t)/(a-t)-i)/(n-i),0,1)}function Ma(e,o,t,a){if(o.pitch<20)return 1;const i=o.getWorldToCameraMatrix();F(i,i,e);const n=jo(t.min[0],t.min[1],t.min[2],1);let r=ct(Ye(),n,i),l=r,d=r;n[1]=t.max[1],r=ct(Ye(),n,i),l=r[1]<l[1]?r:l,d=r[1]>d[1]?r:d,n[0]=t.max[0],r=ct(Ye(),n,i),l=r[1]<l[1]?r:l,d=r[1]>d[1]?r:d,n[1]=t.min[1],r=ct(Ye(),n,i),l=r[1]<l[1]?r:l,d=r[1]>d[1]?r:d;const c=ce(a[0],0,1),m=100*o.pixelsPerMeter*ce(a[1],0,1),u=ce(a[2],0,1),_=Xo(Ye(),l,d,c),f=Math.tan(.5*o.fovX),g=-_[2]*f;if(m===0)return _[1]<-Math.abs(g)?u:1;const p=(-Math.abs(g)-_[1])/m,x=ce(Xt(1,u,p),u,1);return Xt(1,x,ce((o.pitch-20)/20,0,1))}const Sa={model:Ze(`#include "_prelude_fog.fragment.glsl"
#include "_prelude_shadow.fragment.glsl"
#include "_prelude_lighting.glsl"
#include "_prelude_indicator_cutout.fragment.glsl"
#include "_prelude_feature_cutout.fragment.glsl"
uniform float u_opacity;
#ifdef DITHERED_DISCARD
uniform float u_dithered_discard_threshold;
#endif
#ifndef LIGHTING_3D_MODE
uniform vec3 u_lightcolor;uniform vec3 u_lightpos;uniform float u_lightintensity;
#endif
uniform vec4 u_baseColorFactor;uniform vec4 u_emissiveFactor;uniform float u_metallicFactor;uniform float u_roughnessFactor;uniform float u_emissive_strength;in highp vec4 v_position_height;in lowp vec4 v_color_mix;
#ifdef RENDER_SHADOWS
in highp vec4 v_pos_light_view_0;in highp vec4 v_pos_light_view_1;in float v_depth_shadows;
#endif
#ifdef OCCLUSION_TEXTURE_TRANSFORM
uniform vec4 u_occlusionTextureTransform;
#endif
#pragma mapbox: define-attribute highp vec4 normal_4n
#pragma mapbox: define-attribute highp vec3 color_3f
#pragma mapbox: define-attribute highp vec4 color_4f
#pragma mapbox: define-attribute highp vec2 uv_2f
#pragma mapbox: initialize-attribute highp vec4 normal_4n
#pragma mapbox: initialize-attribute highp vec3 color_3f
#pragma mapbox: initialize-attribute highp vec4 color_4f
#pragma mapbox: initialize-attribute highp vec2 uv_2f
#ifdef HAS_ATTRIBUTE_a_feature
in lowp vec4 v_roughness_metallic_emissive_alpha;in mediump vec4 v_height_based_emission_params;
#endif
#ifdef HAS_TEXTURE_u_baseColorTexture
uniform sampler2D u_baseColorTexture;uniform bool u_baseTextureIsAlpha;uniform bool u_alphaMask;uniform float u_alphaCutoff;
#endif
#ifdef HAS_TEXTURE_u_metallicRoughnessTexture
uniform sampler2D u_metallicRoughnessTexture;
#endif
#ifdef HAS_TEXTURE_u_occlusionTexture
uniform sampler2D u_occlusionTexture;uniform float u_aoIntensity;
#endif
#ifdef HAS_TEXTURE_u_normalTexture
uniform sampler2D u_normalTexture;
#endif
#ifdef HAS_TEXTURE_u_emissionTexture
uniform sampler2D u_emissionTexture;
#endif
#ifdef APPLY_LUT_ON_GPU
uniform highp sampler3D u_lutTexture;
#endif
#define saturate(_x) clamp(_x,0.,1.)
vec3 linearTosRGB(vec3 color) {return pow(color,vec3(1./2.2));}vec3 sRGBToLinear(vec3 srgbIn) {return pow(srgbIn,vec3(2.2));}float calculate_NdotL(vec3 normal,vec3 lightDir) {const float ext=0.70710678118;return (clamp(dot(normal,lightDir),-ext,1.0)+ext)/(1.0+ext);}vec3 getDiffuseShadedColor(vec3 albedo,vec3 normal,vec3 lightDir,vec3 lightColor)
{
#ifdef LIGHTING_3D_MODE
vec3 transformed_normal=vec3(-normal.xy,normal.z);float lighting_factor;
#ifdef RENDER_SHADOWS
lighting_factor=shadowed_light_factor_normal(transformed_normal,v_pos_light_view_0,v_pos_light_view_1,v_depth_shadows);
#else
lighting_factor=saturate(dot(transformed_normal,u_lighting_directional_dir));
#endif
return apply_lighting(albedo,transformed_normal,lighting_factor);
#else
vec3 n=normal;float colorvalue=((albedo.x*0.2126)+(albedo.y*0.7152))+(albedo.z*0.0722);vec3 c=vec3(0.03,0.03,0.03);float directional=clamp(dot(n,vec3(lightDir)),0.0,1.0);directional=mix(1.0-u_lightintensity,max((1.0-colorvalue)+u_lightintensity,1.0),directional);vec3 c3=c+clamp((albedo*directional)*lightColor,mix(vec3(0.0),vec3(0.3),vec3(1.0)-lightColor),vec3(1.0));return c3;
#endif
}vec4 getBaseColor() {vec4 albedo=u_baseColorFactor;
#ifdef HAS_ATTRIBUTE_a_color_3f
albedo*=vec4(color_3f,1.0);
#endif
#ifdef HAS_ATTRIBUTE_a_feature
#else
#ifdef HAS_ATTRIBUTE_a_color_4f
albedo*=color_4f;
#endif
#endif
#if defined (HAS_TEXTURE_u_baseColorTexture) && defined (HAS_ATTRIBUTE_a_uv_2f)
vec4 texColor=texture(u_baseColorTexture,uv_2f);if(u_alphaMask) {if (texColor.w < u_alphaCutoff) {discard;}}
#ifdef UNPREMULT_TEXTURE_IN_SHADER
texColor=vec4(unpremultiplyColor(texColor),1.0);
#endif
if(u_baseTextureIsAlpha) {if (texColor.r < 0.5) {discard;}} else {texColor.rgb=sRGBToLinear(texColor.rgb);albedo*=texColor;}
#endif
vec4 color=vec4(mix(albedo.rgb,v_color_mix.rgb,v_color_mix.a),albedo.a);
#ifdef APPLY_LUT_ON_GPU
color=applyLUT(u_lutTexture,color);
#endif
return color;}highp mat3 cotangentFrame(highp vec3 N,highp vec3 p,highp vec2 uv ) {
#ifdef HAS_TEXTURE_u_normalTexture
highp vec3 dp1=vec3(dFdx(p.x),dFdx(p.y),dFdx(p.z));highp vec3 dp2=vec3(dFdy(p.x),dFdy(p.y),dFdy(p.z));highp vec2 duv1=vec2(dFdx(uv.x),dFdx(uv.y));highp vec2 duv2=vec2(dFdy(uv.x),dFdy(uv.y));highp vec3 dp2perp=cross( dp2,N );highp vec3 dp1perp=cross( N,dp1 );highp vec3 T=dp2perp*duv1.x+dp1perp*duv2.x;highp vec3 B=dp2perp*duv1.y+dp1perp*duv2.y;highp float lengthT=dot(T,T);highp float lengthB=dot(B,B);highp float maxLength=max(lengthT,lengthB);highp float invmax=inversesqrt( maxLength );highp mat3 res=mat3( T*invmax,B*invmax,N );return res;
#else
return mat3(1.0);
#endif
}highp vec3 getNormal(){highp vec3 n;
#ifdef HAS_ATTRIBUTE_a_normal_4n
n=normalize(normal_4n.xyz);
#else
highp vec3 fdx=vec3(dFdx(v_position_height.x),dFdx(v_position_height.y),dFdx(v_position_height.z));highp vec3 fdy=vec3(dFdy(v_position_height.x),dFdy(v_position_height.y),dFdy(v_position_height.z));n=normalize(cross(fdx,fdy))*-1.0;
#endif
#if defined(HAS_TEXTURE_u_normalTexture) && defined(HAS_ATTRIBUTE_a_uv_2f)
vec3 nMap=texture( u_normalTexture,uv_2f).xyz;nMap=normalize(2.0*nMap-vec3(1.0));highp vec3 v=normalize(-v_position_height.xyz);highp mat3 TBN=cotangentFrame(n,v,uv_2f);n=normalize(TBN*nMap);
#endif
return n;}struct Material {float perceptualRoughness;float alphaRoughness;float metallic;vec3 f90;vec4 baseColor;vec3 diffuseColor;vec3 specularColor;highp vec3 normal;};Material getPBRMaterial() {Material mat;mat.baseColor=getBaseColor();mat.perceptualRoughness=u_roughnessFactor;mat.metallic=u_metallicFactor;
#ifdef HAS_ATTRIBUTE_a_feature
mat.perceptualRoughness=v_roughness_metallic_emissive_alpha.x;mat.metallic=v_roughness_metallic_emissive_alpha.y;mat.baseColor.w*=v_roughness_metallic_emissive_alpha.w;
#endif
#if defined(HAS_TEXTURE_u_metallicRoughnessTexture) && defined(HAS_ATTRIBUTE_a_uv_2f)
vec4 mrSample=texture(u_metallicRoughnessTexture,uv_2f);mat.perceptualRoughness*=mrSample.g;mat.metallic*=mrSample.b;
#endif
const float c_minRoughness=0.04;mat.perceptualRoughness=clamp(mat.perceptualRoughness,c_minRoughness,1.0);mat.metallic=saturate(mat.metallic);mat.alphaRoughness=mat.perceptualRoughness*mat.perceptualRoughness;const vec3 f0=vec3(0.04);mat.diffuseColor=mat.baseColor.rgb*(vec3(1.0)-f0);mat.diffuseColor*=1.0-mat.metallic;mat.specularColor=mix(f0,mat.baseColor.rgb,mat.metallic);highp float reflectance=max(max(mat.specularColor.r,mat.specularColor.g),mat.specularColor.b);highp float reflectance90=saturate(reflectance*25.0);mat.f90=vec3(reflectance90);mat.normal=getNormal();return mat;}float V_GGX(float NdotL,float NdotV,float roughness)
{float a2=roughness*roughness;float GGXV=NdotL*sqrt(NdotV*NdotV*(1.0-a2)+a2);float GGXL=NdotV*sqrt(NdotL*NdotL*(1.0-a2)+a2);return 0.5/(GGXV+GGXL);}float V_GGXFast(float NdotL,float NdotV,float roughness) {float a=roughness;float GGXV=NdotL*(NdotV*(1.0-a)+a);float GGXL=NdotV*(NdotL*(1.0-a)+a);return 0.5/(GGXV+GGXL);}vec3 F_Schlick(vec3 specularColor,vec3 f90,float VdotH)
{return specularColor+(f90-specularColor)*pow(clamp(1.0-VdotH,0.0,1.0),5.0);}vec3 F_SchlickFast(vec3 specularColor,float VdotH)
{float x=1.0-VdotH;float x4=x*x*x*x;return specularColor+(1.0-specularColor)*x4*x;}float D_GGX(highp float NdotH,float alphaRoughness)
{highp float a4=alphaRoughness*alphaRoughness;highp float f=(NdotH*a4-NdotH)*NdotH+1.0;return a4/(PI*f*f);}vec3 diffuseBurley(Material mat,float LdotH,float NdotL,float NdotV)
{float f90=2.0*LdotH*LdotH*mat.alphaRoughness-0.5;return (mat.diffuseColor/PI)*(1.0+f90*pow((1.0-NdotL),5.0))*(1.0+f90*pow((1.0-NdotV),5.0));}vec3 diffuseLambertian(Material mat)
{
#ifdef LIGHTING_3D_MODE
return mat.diffuseColor;
#else
return mat.diffuseColor/PI;
#endif
}vec3 EnvBRDFApprox(vec3 specularColor,float roughness,highp float NdotV)
{vec4 c0=vec4(-1,-0.0275,-0.572,0.022);vec4 c1=vec4(1,0.0425,1.04,-0.04);highp vec4 r=roughness*c0+c1;highp float a004=min(r.x*r.x,exp2(-9.28*NdotV))*r.x+r.y;vec2 AB=vec2(-1.04,1.04)*a004+r.zw;return specularColor*AB.x+AB.y;}vec3 computeIndirectLightContribution(Material mat,float NdotV,vec3 normal)
{vec3 env_light=vec3(0.65,0.65,0.65);
#ifdef LIGHTING_3D_MODE
float ambient_factor=calculate_ambient_directional_factor(normal);env_light=u_lighting_ambient_color*ambient_factor;
#endif
vec3 envBRDF=EnvBRDFApprox(mat.specularColor,mat.perceptualRoughness,NdotV);vec3 indirectSpecular= envBRDF*env_light;vec3 indirectDiffuse=mat.diffuseColor*env_light;return indirectSpecular+indirectDiffuse;}vec3 computeLightContribution(Material mat,vec3 lightPosition,vec3 lightColor)
{highp vec3 n=mat.normal;highp vec3 v=normalize(-v_position_height.xyz);highp vec3 l=normalize(lightPosition);highp vec3 h=normalize(v+l);float NdotV=clamp(abs(dot(n,v)),0.001,1.0);float NdotL=saturate(dot(n,l));highp float NdotH=saturate(dot(n,h));float VdotH=saturate(dot(v,h));vec3 f=F_SchlickFast(mat.specularColor,VdotH);float g=V_GGXFast(NdotL,NdotV,mat.alphaRoughness);float d=D_GGX(NdotH,mat.alphaRoughness);vec3 diffuseTerm=(1.0-f)*diffuseLambertian(mat);vec3 specularTerm=f*g*d;vec3 transformed_normal=vec3(-n.xy,n.z);float lighting_factor;
#ifdef RENDER_SHADOWS
lighting_factor=shadowed_light_factor_normal(transformed_normal,v_pos_light_view_0,v_pos_light_view_1,v_depth_shadows);
#else
lighting_factor=NdotL;
#endif
vec3 directLightColor=(specularTerm+diffuseTerm)*lighting_factor*lightColor;vec3 indirectLightColor=computeIndirectLightContribution(mat,NdotV,transformed_normal);vec3 color=(saturate(directLightColor)+indirectLightColor);float intensityFactor=1.0;
#if !defined(LIGHTING_3D_MODE)
const vec3 luminosityFactor=vec3(0.2126,0.7152,0.0722);float luminance=dot(diffuseTerm,luminosityFactor);intensityFactor=mix((1.0-u_lightintensity),max((1.0-luminance+u_lightintensity),1.0),NdotL);
#endif
color*=intensityFactor;return color;}void main() {vec3 lightDir;vec3 lightColor;
#ifdef LIGHTING_3D_MODE
lightDir=u_lighting_directional_dir;lightDir.xy=-lightDir.xy;lightColor=u_lighting_directional_color;
#else
lightDir=u_lightpos;lightColor=u_lightcolor;
#endif
vec4 finalColor;
#ifdef DIFFUSE_SHADED
vec3 N=getNormal();vec3 baseColor=getBaseColor().rgb;vec3 diffuse=getDiffuseShadedColor(baseColor,N,lightDir,lightColor);
#ifdef HAS_TEXTURE_u_occlusionTexture
float ao=(texture(u_occlusionTexture,uv_2f).r-1.0)*u_aoIntensity+1.0;diffuse*=ao;
#endif
finalColor=vec4(mix(diffuse,baseColor,u_emissive_strength),1.0)*u_opacity;
#else
Material mat=getPBRMaterial();vec3 color=computeLightContribution(mat,lightDir,lightColor);float ao=1.0;
#if defined (HAS_TEXTURE_u_occlusionTexture) && defined(HAS_ATTRIBUTE_a_uv_2f)
#ifdef OCCLUSION_TEXTURE_TRANSFORM
vec2 uv=uv_2f.xy*u_occlusionTextureTransform.zw+u_occlusionTextureTransform.xy;
#else
vec2 uv=uv_2f;
#endif
ao=(texture(u_occlusionTexture,uv).x-1.0)*u_aoIntensity+1.0;color*=ao;
#endif
vec4 emissive=u_emissiveFactor;
#if defined(HAS_TEXTURE_u_emissionTexture) && defined(HAS_ATTRIBUTE_a_uv_2f)
emissive.rgb*=sRGBToLinear(texture(u_emissionTexture,uv_2f).rgb);
#endif
#ifdef APPLY_LUT_ON_GPU
float emissiveFactorLength=max(length(u_emissiveFactor.rgb),0.001);emissive.rgb=sRGBToLinear(applyLUT(u_lutTexture,linearTosRGB(emissive.rgb/emissiveFactorLength).rbg))*emissiveFactorLength;
#endif
color+=emissive.rgb;float opacity=mat.baseColor.w*u_opacity;
#ifdef HAS_ATTRIBUTE_a_feature
float resEmission=v_roughness_metallic_emissive_alpha.z;resEmission*=v_height_based_emission_params.z+v_height_based_emission_params.w*pow(clamp(v_height_based_emission_params.x,0.0,1.0),v_height_based_emission_params.y);vec3 color_mix=v_color_mix.rgb;
#ifdef APPLY_LUT_ON_GPU
color_mix=applyLUT(u_lutTexture,color_mix);
#endif
color=mix(color,color_mix,min(1.0,resEmission));
#ifdef HAS_ATTRIBUTE_a_color_4f
float distance=length(vec2(1.3*max(0.0,abs(color_4f.x)-color_4f.z),color_4f.y));distance+= mix(0.5,0.0,clamp(resEmission-1.0,0.0,1.0));opacity*=v_roughness_metallic_emissive_alpha.w*saturate(1.0-distance*distance);
#endif
#endif
vec3 unlitColor=mat.baseColor.rgb*ao+emissive.rgb;color=mix(color,unlitColor,u_emissive_strength);color=linearTosRGB(color);color*=opacity;finalColor=vec4(color,opacity);
#endif
#ifdef DITHERED_DISCARD
if (abs(u_dithered_discard_threshold) < 1.0) {float ditherValue=fract(52.9829189*fract(0.06711056*gl_FragCoord.x+0.00583715*gl_FragCoord.y));float compareValue=mix(1.0-ditherValue,ditherValue,step(0.0,u_dithered_discard_threshold));if (abs(u_dithered_discard_threshold) < compareValue) {discard;}}
#endif
#ifdef FOG
finalColor=fog_dither(fog_apply_premultiplied(finalColor,v_fog_pos,v_position_height.w));
#endif
#ifdef RENDER_CUTOFF
finalColor*=v_cutoff_opacity;
#endif
glFragColor=finalColor;
#ifdef OVERDRAW_INSPECTOR
glFragColor=vec4(1.0);
#endif
HANDLE_WIREFRAME_DEBUG;}`,`#include "_prelude_fog.vertex.glsl"
#include "_prelude_shadow.vertex.glsl"
#include "_prelude_feature_cutout.vertex.glsl"
in vec3 a_pos_3f;
#pragma mapbox: define-attribute highp vec4 normal_4n
#pragma mapbox: define-attribute highp vec2 uv_2f
#pragma mapbox: define-attribute highp vec3 color_3f
#pragma mapbox: define-attribute highp vec4 color_4f
#pragma mapbox: define-attribute-vertex-shader-only highp uvec2 feature
#define MODEL_PART_COUNT 7u
#define MODEL_PART_STYLE_SIZE_VEC4 28u
#ifdef HAS_ATTRIBUTE_a_feature
struct ModelPartStyle {vec4 color_mix;vec4 rmea;vec4 gradient;float gradient_power;};layout(std140) uniform ModelPartStyleUniform {vec4 part_style[MODEL_PART_STYLE_SIZE_VEC4];} u_model_part_style;uniform vec4 u_model_mesh_params;
#endif
uniform mat4 u_matrix;uniform mat4 u_node_matrix;uniform mat4 u_lighting_matrix;uniform vec3 u_camera_pos;uniform vec4 u_color_mix;
#ifdef INSTANCED_ARRAYS
in vec4 a_normal_matrix0;in vec4 a_normal_matrix1;in vec4 a_normal_matrix2;in vec4 a_normal_matrix3;
#else
uniform highp mat4 u_normal_matrix;
#endif
#ifdef RENDER_SHADOWS
uniform mat4 u_light_matrix_0;uniform mat4 u_light_matrix_1;out highp vec4 v_pos_light_view_0;out highp vec4 v_pos_light_view_1;out float v_depth_shadows;
#endif
out vec4 v_position_height;out lowp vec4 v_color_mix;
#ifdef HAS_ATTRIBUTE_a_feature
out lowp vec4 v_roughness_metallic_emissive_alpha;out mediump vec4 v_height_based_emission_params;
#endif
vec3 sRGBToLinear(vec3 srgbIn) {return pow(srgbIn,vec3(2.2));}
#ifdef HAS_ATTRIBUTE_a_feature
uint decodeModelPartId(uvec2 feature) {uint partId=feature.y & 0xFu;return partId < MODEL_PART_COUNT ? partId : 0u;}vec4 decodeModelVertexColor(uvec2 feature) {uvec4 nibbles=uvec4(feature.x >> 12u,feature.x >> 8u,feature.x >> 4u,feature.x) & 0xFu;return vec4(nibbles*17u)/255.0;}ModelPartStyle readModelPartStyle(uint partId) {uint base=partId*4u;ModelPartStyle style;style.color_mix=u_model_part_style.part_style[base];style.rmea=u_model_part_style.part_style[base+1u];style.gradient=u_model_part_style.part_style[base+2u];style.gradient_power=u_model_part_style.part_style[base+3u].x;return style;}vec3 modelAlbedo(ModelPartStyle style,vec4 vertexColor) {float ambientOcclusion=mix(1.0,vertexColor.a,u_model_mesh_params.z);return ambientOcclusion*mix(vertexColor.rgb,style.color_mix.rgb,style.color_mix.a);}vec4 resolveModelEmissiveGradient(ModelPartStyle style,float height) {float begin=u_model_mesh_params.x+u_model_mesh_params.y*style.gradient.x;float span=u_model_mesh_params.y*(style.gradient.y-style.gradient.x);return vec4((height-begin)/span,style.gradient_power,style.gradient.z,style.gradient.w);}
#endif
void main() {
#pragma mapbox: initialize-attribute highp vec4 normal_4n
#pragma mapbox: initialize-attribute highp vec2 uv_2f
#pragma mapbox: initialize-attribute highp vec3 color_3f
#pragma mapbox: initialize-attribute highp vec4 color_4f
#pragma mapbox: initialize-attribute-custom highp uvec2 feature
highp mat4 normal_matrix;
#ifdef INSTANCED_ARRAYS
normal_matrix=mat4(a_normal_matrix0,a_normal_matrix1,a_normal_matrix2,a_normal_matrix3);
#else
normal_matrix=u_normal_matrix;
#endif
vec3 local_pos;mat3 rs;
#ifdef MODEL_POSITION_ON_GPU
vec3 pos_color=normal_matrix[0].xyz;vec4 translate=normal_matrix[1];vec3 pos_a=floor(pos_color);vec3 rgb=1.05*(pos_color-pos_a);float hidden=float(pos_a.x > EXTENT);float color_mix=pos_a.z/100.0;v_color_mix=vec4(sRGBToLinear(rgb),color_mix);float meter_to_tile=normal_matrix[0].w;vec4 pos=vec4(pos_a.xy,translate.z,1.0);rs[0].x=normal_matrix[1].w;rs[0].yz=normal_matrix[2].xy;rs[1].xy=normal_matrix[2].zw;rs[1].z=normal_matrix[3].x;rs[2].xyz=normal_matrix[3].yzw;vec4 pos_node=u_lighting_matrix*vec4(a_pos_3f,1.0);vec3 rotated_pos_node=rs*pos_node.xyz;vec3 pos_model_tile=(rotated_pos_node+vec3(translate.xy,0.0))*vec3(meter_to_tile,meter_to_tile,1.0);pos.xyz+=pos_model_tile;local_pos=pos.xyz;gl_Position=mix(u_matrix*pos,AWAY,hidden);pos.z*=meter_to_tile;v_position_height.xyz=pos.xyz-u_camera_pos;
#else
local_pos=a_pos_3f;gl_Position=u_matrix*vec4(a_pos_3f,1);v_position_height.xyz=vec3(u_lighting_matrix*vec4(a_pos_3f,1));v_color_mix=vec4(sRGBToLinear(u_color_mix.rgb),u_color_mix.a);
#endif
v_position_height.w=a_pos_3f.z;
#ifdef HAS_ATTRIBUTE_a_feature
ModelPartStyle part_style=readModelPartStyle(decodeModelPartId(feature));v_color_mix=vec4(modelAlbedo(part_style,decodeModelVertexColor(feature)),1.0);v_roughness_metallic_emissive_alpha=part_style.rmea;v_height_based_emission_params=resolveModelEmissiveGradient(part_style,a_pos_3f.z);
#endif
#ifdef FOG
v_fog_pos=fog_position(local_pos);
#endif
#ifdef RENDER_CUTOFF
v_cutoff_opacity=cutoff_opacity(u_cutoff_params,gl_Position.z);
#endif
#ifdef HAS_ATTRIBUTE_a_normal_4n
#ifdef MODEL_POSITION_ON_GPU
float x_squared_scale=dot(rs[0],rs[0]);float y_squared_scale=dot(rs[1],rs[1]);float z_squared_scale=dot(rs[2],rs[2]);vec3 squared_scale=vec3(x_squared_scale,y_squared_scale,z_squared_scale);normal_4n=vec4(rs*((u_lighting_matrix*vec4(normal_4n.xyz,0.0)).xyz/squared_scale),0.0);normal_4n=normalize(normal_4n);
#else
normal_4n=vec4((normal_matrix*vec4(normal_4n.xyz,0)).xyz,0.0);
#endif
#endif
#ifdef HAS_ATTRIBUTE_a_feature
#ifdef HAS_ATTRIBUTE_a_color_4f
v_roughness_metallic_emissive_alpha.w=clamp(color_4f.a*v_roughness_metallic_emissive_alpha.w*(v_roughness_metallic_emissive_alpha.z-1.0),0.0,1.0);
#endif
#endif
#ifdef RENDER_SHADOWS
vec4 shadow_pos=u_node_matrix*vec4(local_pos,1.0);
#ifdef NORMAL_OFFSET
#ifdef HAS_ATTRIBUTE_a_normal_4n
#ifdef MODEL_POSITION_ON_GPU
vec3 offset=shadow_normal_offset(vec3(-normal_4n.xy,normal_4n.z));shadow_pos.xyz+=offset*shadow_normal_offset_multiplier0();
#else
vec3 offset=shadow_normal_offset_model(normal_4n.xyz);shadow_pos.xyz+=offset*shadow_normal_offset_multiplier0();
#endif
#endif
#endif
v_pos_light_view_0=u_light_matrix_0*shadow_pos;v_pos_light_view_1=u_light_matrix_1*shadow_pos;v_depth_shadows=gl_Position.w;
#endif
}`),modelDepth:Ze("void main() {}",`in vec3 a_pos_3f;uniform mat4 u_matrix;
#ifdef MODEL_POSITION_ON_GPU
#ifdef INSTANCED_ARRAYS
in vec4 a_normal_matrix0;in vec4 a_normal_matrix1;in vec4 a_normal_matrix2;in vec4 a_normal_matrix3;
#else
uniform highp mat4 u_instance;
#endif
uniform highp mat4 u_node_matrix;
#endif
void main() {
#ifdef MODEL_POSITION_ON_GPU
highp mat4 instance;
#ifdef INSTANCED_ARRAYS
instance=mat4(a_normal_matrix0,a_normal_matrix1,a_normal_matrix2,a_normal_matrix3);
#else
instance=u_instance;
#endif
vec3 pos_color=instance[0].xyz;vec4 translate=instance[1];vec3 pos_a=floor(pos_color);float hidden=float(pos_a.x > EXTENT);float meter_to_tile=instance[0].w;vec4 pos=vec4(pos_a.xy,translate.z,1.0);mat3 rs;rs[0].x=instance[1].w;rs[0].yz=instance[2].xy;rs[1].xy=instance[2].zw;rs[1].z=instance[3].x;rs[2].xyz=instance[3].yzw;vec4 pos_node=u_node_matrix*vec4(a_pos_3f,1.0);vec3 rotated_pos_node=rs*pos_node.xyz;vec3 pos_model_tile=(rotated_pos_node+vec3(translate.xy,0.0))*vec3(meter_to_tile,meter_to_tile,1.0);pos.xyz+=pos_model_tile;gl_Position=mix(u_matrix*pos,AWAY,hidden);
#else
gl_Position=u_matrix*vec4(a_pos_3f,1);
#endif
}`),fillExtrusionDepth:Ze("void main() {}",`#include "_prelude_terrain.vertex.glsl"
#include "_prelude_material_table.vertex.glsl"
uniform mat4 u_matrix;uniform float u_edge_radius;uniform float u_width_scale;uniform float u_vertical_scale;
#ifdef TERRAIN
uniform int u_height_type;uniform int u_base_type;
#endif
in ivec4 a_pos_normal_ed;
#if defined(HAS_CENTROID) || defined(TERRAIN)
in uvec2 a_centroid_pos;
#endif
#ifdef RENDER_WALL_MODE
in ivec4 a_join_normal_inside;
#endif
#pragma mapbox: define highp float base
#pragma mapbox: define highp float height
#pragma mapbox: define highp float line_width
#pragma mapbox: define highp vec4 color
void main() {DECLARE_MATERIAL_TABLE_INFO
#pragma mapbox: initialize highp float base
#pragma mapbox: initialize highp float height
#pragma mapbox: initialize highp float line_width
#pragma mapbox: initialize highp vec4 color
base*=u_vertical_scale;height*=u_vertical_scale;vec3 top_up_ny=vec3(a_pos_normal_ed.xyz & 1);vec3 pos_nx=vec3(a_pos_normal_ed.xyz >> 1);base=max(0.0,base);height=max(0.0,top_up_ny.y==0.0 && top_up_ny.x==1.0 ? height-u_edge_radius : height);float t=top_up_ny.x;vec2 centroid_pos=vec2(0.0);
#if defined(HAS_CENTROID) || defined(TERRAIN)
centroid_pos=vec2(a_centroid_pos);
#endif
vec3 pos;
#ifdef TERRAIN
bool is_flat_height=centroid_pos.x !=0.0 && u_height_type==1;bool is_flat_base=centroid_pos.x !=0.0 && u_base_type==1;float ele=elevation(pos_nx.xy);bool is_elevation_encoded=centroid_pos.y==0.0 || (centroid_pos.y > 0.0 && int(centroid_pos.y)-(int(centroid_pos.y)/8)*8==7);float c_ele=is_flat_height || is_flat_base ? (is_elevation_encoded ? elevationFromUint16(centroid_pos.x) : flatElevation(centroid_pos)) : ele;float h_height=is_flat_height ? max(c_ele+height,ele+base+2.0) : ele+height;float h_base=is_flat_base ? max(c_ele+base,ele+base) : ele+(base==0.0 ?-5.0 : base);float h=t > 0.0 ? max(h_base,h_height) : h_base;pos=vec3(pos_nx.xy,h);
#else
pos=vec3(pos_nx.xy,t > 0.0 ? height : base);
#endif
#ifdef RENDER_WALL_MODE
vec3 join_normal_inside=vec3(a_join_normal_inside);vec2 wall_offset=u_width_scale*line_width*(join_normal_inside.xy/EXTENT);pos.xy+=(1.0-join_normal_inside.z)*wall_offset*0.5;pos.xy-=join_normal_inside.z*wall_offset*0.5;
#endif
float hidden=float((centroid_pos.x==0.0 && centroid_pos.y==1.0) || (color.a==0.0));gl_Position=mix(u_matrix*vec4(pos,1),AWAY,hidden);}`),fillExtrusionGroundEffect:Ze(`uniform highp float u_ao_pass;uniform highp float u_opacity;uniform highp float u_flood_light_intensity;uniform highp vec3 u_flood_light_color;uniform highp float u_attenuation;uniform sampler2D u_fb;uniform float u_fb_size;
#ifdef SDF_SUBPASS
in highp vec2 v_pos;in highp vec4 v_line_segment;in highp float v_flood_light_radius_tile;in highp vec2 v_ao;float line_df(highp vec2 a,highp vec2 b,highp vec2 p) {highp vec2 ba=b-a;highp vec2 pa=p-a;highp float r=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);return length(pa-r*ba);}
#ifdef FOG
in highp float v_fog;
#endif
#endif
void main() {
#ifdef CLEAR_SUBPASS
vec4 color=vec4(1.0);
#ifdef CLEAR_FROM_TEXTURE
color=texture(u_fb,gl_FragCoord.xy/vec2(u_fb_size));
#endif
glFragColor=color;
#else
#ifdef SDF_SUBPASS
highp float d=line_df(v_line_segment.xy,v_line_segment.zw,v_pos);highp float effect_radius=mix(v_flood_light_radius_tile,v_ao.y,u_ao_pass);d/=effect_radius;d=min(d,1.0);d=1.0-pow(1.0-d,u_attenuation);highp float effect_intensity=mix(u_flood_light_intensity,v_ao.x,u_ao_pass);highp float fog=1.0;
#ifdef FOG
fog=v_fog;
#endif
#ifdef RENDER_CUTOFF
fog*=v_cutoff_opacity;
#endif
glFragColor=vec4(vec3(0.0),mix(1.0,d,effect_intensity*u_opacity*fog));
#else
#ifdef USE_MRT1
out_Target1=vec4(1.0-texture(u_fb,gl_FragCoord.xy/vec2(u_fb_size)).a,0.0,0.0,0.0);
#else
vec4 color=mix(vec4(u_flood_light_color,1.0),vec4(vec3(0.0),1.0),u_ao_pass);
#ifdef OVERDRAW_INSPECTOR
color=vec4(1.0);
#endif
glFragColor=color;
#endif
#endif
HANDLE_WIREFRAME_DEBUG;
#endif
}`,`#include "_prelude_fog.vertex.glsl"
in highp ivec4 a_pos_end;in highp int a_angular_offset_factor;in highp uint a_hidden_by_landmark;
#ifdef SDF_SUBPASS
out highp vec2 v_pos;out highp vec4 v_line_segment;out highp float v_flood_light_radius_tile;out highp vec2 v_ao;
#ifdef FOG
out highp float v_fog;
#endif
#endif
uniform highp float u_flood_light_intensity;uniform highp mat4 u_matrix;uniform highp float u_ao_pass;uniform highp float u_meter_to_tile;uniform highp float u_edge_radius;uniform highp float u_dynamic_offset;uniform highp vec2 u_ao;
#pragma mapbox: define highp float flood_light_ground_radius
const float TANGENT_CUTOFF=4.0;const float NORM=32767.0;void main() {
#pragma mapbox: initialize highp float flood_light_ground_radius
vec4 pos_end=vec4(a_pos_end);vec2 p=pos_end.xy;vec2 q=floor(pos_end.zw*0.5);vec2 start_bottom=pos_end.zw-q*2.0;float fl_ground_radius=abs(flood_light_ground_radius);float direction=flood_light_ground_radius < 0.0 ?-1.0 : 1.0;float flood_radius_tile=fl_ground_radius*u_meter_to_tile;vec2 v=normalize(q-p);float ao_radius=u_ao.y/3.5;float effect_radius=mix(flood_radius_tile,ao_radius,u_ao_pass)+u_edge_radius;float angular_offset_factor=float(a_angular_offset_factor)/NORM*TANGENT_CUTOFF;float angular_offset=direction*angular_offset_factor*effect_radius;float top=1.0-start_bottom.y;float side=(0.5-start_bottom.x)*2.0;vec2 extrusion_parallel=v*side*mix(u_dynamic_offset,angular_offset,top);vec2 perp=vec2(v.y,-v.x);vec2 extrusion_perp=direction*perp*effect_radius*top;vec3 pos=vec3(mix(q,p,start_bottom.x),0.0);pos.xy+=extrusion_parallel+extrusion_perp;
#ifdef SDF_SUBPASS
v_pos=pos.xy;v_line_segment=vec4(p,q)+perp.xyxy*u_edge_radius;v_flood_light_radius_tile=flood_radius_tile;v_ao=vec2(u_ao.x,ao_radius);
#ifdef FOG
v_fog_pos=fog_position(pos);v_fog=1.0-fog(v_fog_pos);
#endif
#endif
float hidden_by_landmark=0.0;
#ifdef HAS_CENTROID
hidden_by_landmark=float(a_hidden_by_landmark);
#endif
float isFloodlit=float(fl_ground_radius > 0.0 && u_flood_light_intensity > 0.0);float hidden=mix(1.0-isFloodlit,isFloodlit,u_ao_pass);hidden+=hidden_by_landmark;gl_Position=mix(u_matrix*vec4(pos,1.0),AWAY,float(hidden > 0.0));
#ifdef RENDER_CUTOFF
v_cutoff_opacity=cutoff_opacity(u_cutoff_params,gl_Position.z);
#endif
}`),groundShadow:Ze(`#include "_prelude_shadow.fragment.glsl"
#include "_prelude_indicator_cutout.fragment.glsl"
#include "_prelude_feature_cutout.fragment.glsl"
precision highp float;uniform vec3 u_ground_shadow_factor;in vec4 v_pos_light_view_0;in vec4 v_pos_light_view_1;
#ifdef FOG
in float v_fog_opacity;
#endif
void main() {float light=shadowed_light_factor_plane_bias(v_pos_light_view_0,v_pos_light_view_1,1.0/gl_FragCoord.w);vec3 shadow=mix(u_ground_shadow_factor,vec3(1.0),light);
#ifdef RENDER_CUTOFF
shadow=mix(vec3(1.0),shadow,cutoff_opacity(u_cutoff_params,1.0/gl_FragCoord.w));
#endif
#ifdef FOG
shadow=mix(shadow,vec3(1.0),v_fog_opacity);
#endif
glFragColor=vec4(shadow,1.0);}`,`#include "_prelude_fog.vertex.glsl"
uniform mat4 u_matrix;uniform mat4 u_light_matrix_0;uniform mat4 u_light_matrix_1;in ivec2 a_pos;out vec4 v_pos_light_view_0;out vec4 v_pos_light_view_1;
#ifdef FOG
out float v_fog_opacity;
#endif
void main() {gl_Position=u_matrix*vec4(a_pos,0.0,1.0);v_pos_light_view_0=u_light_matrix_0*vec4(a_pos,0.0,1.0);v_pos_light_view_1=u_light_matrix_1*vec4(a_pos,0.0,1.0);
#ifdef FOG
v_fog_pos=fog_position(vec2(a_pos));v_fog_opacity=fog(v_fog_pos);
#endif
}`)},Ra=(e,o)=>({u_matrix:e,u_ground_shadow_factor:o}),Ea={model:e=>({u_matrix:new Re(e),u_lighting_matrix:new Re(e),u_normal_matrix:new Re(e),u_node_matrix:new Re(e),u_lightpos:new dt(e),u_lightintensity:new Ee(e),u_lightcolor:new dt(e),u_camera_pos:new dt(e),u_opacity:new Ee(e),u_baseColorFactor:new We(e),u_emissiveFactor:new We(e),u_metallicFactor:new Ee(e),u_roughnessFactor:new Ee(e),u_baseTextureIsAlpha:new Ae(e),u_alphaMask:new Ae(e),u_alphaCutoff:new Ee(e),u_baseColorTexture:new Ae(e),u_metallicRoughnessTexture:new Ae(e),u_normalTexture:new Ae(e),u_occlusionTexture:new Ae(e),u_emissionTexture:new Ae(e),u_lutTexture:new Ae(e),u_color_mix:new We(e),u_aoIntensity:new Ee(e),u_emissive_strength:new Ee(e),u_occlusionTextureTransform:new We(e),u_dithered_discard_threshold:new Ee(e),u_model_mesh_params:new We(e)}),modelDepth:e=>({u_matrix:new Re(e),u_instance:new Re(e),u_node_matrix:new Re(e)}),groundShadow:e=>({u_matrix:new Re(e),u_ground_shadow_factor:new dt(e)}),fillExtrusionDepth:_o,fillExtrusionGroundEffect:_a},xt=[];function Yt(e){return xt[e]=xt[e]||new Float64Array(16)}const mt=[],Aa=new Float32Array(16);class Ca{constructor(o,t){this.aabb=o,this.lastCascade=t}}class Fa{add(o,t){const a=this.receivers[o.key];a!==void 0?(a.aabb.min[0]=Math.min(a.aabb.min[0],t.min[0]),a.aabb.min[1]=Math.min(a.aabb.min[1],t.min[1]),a.aabb.min[2]=Math.min(a.aabb.min[2],t.min[2]),a.aabb.max[0]=Math.max(a.aabb.max[0],t.max[0]),a.aabb.max[1]=Math.max(a.aabb.max[1],t.max[1]),a.aabb.max[2]=Math.max(a.aabb.max[2],t.max[2])):this.receivers[o.key]=new Ca(t,null)}clear(){this.receivers={}}get(o){return this.receivers[o.key]}computeRequiredCascades(o,t,a){const i=ot.fromPoints(o.points);let n=0;for(const r in this.receivers){const l=this.receivers[r];if(!l||!i.intersectsAabb(l.aabb))continue;l.aabb.min=i.closestPoint(l.aabb.min),l.aabb.max=i.closestPoint(l.aabb.max);const d=l.aabb.getCorners();for(let c=0;c<a.length;c++){let m=!0;for(const u of d){const _=[u[0]*t,u[1]*t,u[2]];if(ye(_,_,a[c].matrix),_[0]<-1||_[0]>1||_[1]<-1||_[1]>1){m=!1;break}}if(l.lastCascade=c,n=Math.max(n,c),m)break}}return n+1}}function ht(e,o,t){const a=It([],t,o),i=It([],e,o),n=Bo([],a,i),r=Go(n);return r===0?[0,0,1,0]:(je(n,n,1/r),[n[0],n[1],n[2],-Ho(n,o)])}function Oa(e,o,t,a,i,n){const r=e.zoom,l=e.scale,d=e.worldSize,c=1/d,m=e.aspect,u=Math.sqrt(1+m*m)*Math.tan(.5*e.fovX),_=u*u,f=a-t,g=a+t;let p,x;_>f/g?(p=a,x=a*u):(p=.5*g*(1+_),x=.5*Math.sqrt(f*f+2*(a*a+t*t)*_+g*g*_*_));const y=e.projection.pixelsPerMeter(e.center.lat,d),v=e._camera.getCameraToWorldMercator(),b=[0,0,-p*c];ye(b,b,v);let s=x*c;const T=function(K){return K[0]/=l,K[1]/=l,K[2]=ao(K[2],e._center.lat),K},h=e._edgeInsets;if(!(h.left===0&&h.top===0&&h.right===0&&h.bottom===0||h.left===h.right&&h.top===h.bottom)){const K=e._camera.getWorldToCamera(e.worldSize,e.projection.zAxisUnit==="meters"?y:1),J=e._camera.getCameraToClipPerspective(e._fov,e.width/e.height,t,a);J[8]=2*-e.centerOffset.x/e.width,J[9]=2*e.centerOffset.y/e.height;const L=new Float64Array(16);No(L,J,K);const be=new Float64Array(16);tt(be,L);const De=Nt.fromInvProjectionMatrix(be,d,r,!0);for(const Pe of De.points){const Ne=T(Pe);s=Math.max(s,Io(Lo([],b,Ne)))}}s*=i/(i-1);const A=Math.acos(o[2]),w=Math.atan2(-o[0],-o[1]),S=new zo;S.position=b,S.setPitchBearing(A,w);const E=S.getWorldToCamera(d,y),M=s*d,I=Math.min(e._mercatorZfromZoom(17)*d*-2,-2*M),B=S.getCameraToClipOrthographic(-M,M,-M,M,I,(M+n*y)/o[2]),Y=new Float64Array(16);F(Y,B,E);const Oe=Uo(Math.floor(1e6*b[0])/1e6*d,Math.floor(1e6*b[1])/1e6*d,0),ie=.5*i,Q=[0,0,0];ye(Q,Oe,Y),je(Q,Q,ie);const G=[Math.floor(Q[0]),Math.floor(Q[1]),Math.floor(Q[2])],C=[0,0,0];It(C,Q,G),je(C,C,-1/ie);const re=new Float64Array(16);return oo(re),Bt(re,re,C),F(Y,re,Y),[Y,M]}class ge extends Qt{constructor(o,t,a,i){super(),this.id=o,this.type="model",this.models=[],this._options=t,this._modelsInfo=new Map,this._abortController=null}cancelModelRequests(){this._abortController&&(this._abortController.abort(),this._abortController=null)}async loadGLTFFromURI(o,t){const a=await this.map._requestManager.transformRequest(o,Jt.Model,t);return ra(a,t)}async loadModel(o,t,a){try{const i=await this.loadGLTFFromURI(t.uri,a);if(a.aborted)return;const n=this._modelsInfo.get(o);if(!n)return;const r=na(i),l=n.modelSpec,d=new sa(o,l.uri,l.position,l.orientation,r);ge.applyModelSpecification(d,l),d.computeBoundsAndApplyParent(),this.models.push(d),n.model=d}catch(i){if(a.aborted)return;this.fire(new to(new Error(`Could not load model ${o} from ${t.uri}`,{cause:i})))}}async load(){this._abortController||(this._abortController=new AbortController);const o=this._abortController.signal,t=[];for(const a in this._options.models){const i=this._options.models[a],n=this._modelsInfo.get(a);if(n&&n.model){n.modelSpec=i;const r=n.model;r.position=i.position!=null?new et(i.position[0],i.position[1]):new et(0,0),r.orientation=i.orientation??[0,0,0],ge.applyModelSpecification(r,i),r.computeBoundsAndApplyParent(),this.models.push(r)}else n?n.modelSpec=i:(this._modelsInfo.set(a,{modelSpec:i,model:null}),t.push(this.loadModel(a,i,o)))}t.length!==0?(await Promise.allSettled(t),o.aborted||this.fire(new Je("data",{dataType:"source",sourceDataType:"metadata"}))):this.loaded()&&this.fire(new Je("data",{dataType:"source",sourceDataType:"metadata"}))}static arrayFromColorSpecification(o){const t=o;if(t===void 0)return;if(Array.isArray(t))return[t[0],t[1],t[2]];const a=qe.parse(t);return a?[a.r,a.g,a.b]:void 0}static applyModelSpecification(o,t){if(t.nodeOverrides&&ge.convertNodeOverrides(o,t.nodeOverrides),t.materialOverrides&&ge.convertMaterialOverrides(o,t.materialOverrides),t.nodeOverrideNames&&(o.nodeOverrideNames=[...t.nodeOverrideNames]),t.materialOverrideNames&&(o.materialOverrideNames=[...t.materialOverrideNames]),t.featureProperties&&(o.featureProperties=t.featureProperties),t.lightOverrides){const a=t.lightOverrides,i=ge.arrayFromColorSpecification(a["light-ambient-color"]),n=ge.arrayFromColorSpecification(a["light-directional-color"]);o.lightOverrides={ambientIntensity:a["light-ambient-intensity"],ambientColor:i,directionalIntensity:a["light-directional-intensity"],directionalColor:n}}else o.lightOverrides=void 0}static convertNodeOverrides(o,t){if(Array.isArray(t)&&t.every(a=>typeof a=="string")){o.nodeOverrideNames=[];for(const a of t)o.nodeOverrideNames.push(a)}else Object.entries(t).forEach(([a,i])=>{const n={orientation:[0,0,0],minZoom:void 0,maxZoom:void 0};if(Object.hasOwn(i,"orientation")){const r=i.orientation;r&&(n.orientation=r)}Object.hasOwn(i,"minzoom")&&(n.minZoom=i.minzoom),Object.hasOwn(i,"maxzoom")&&(n.maxZoom=i.maxzoom),o.nodeOverrides.set(a,n)})}static convertMaterialOverrides(o,t){if(Array.isArray(t)&&t.every(a=>typeof a=="string")){o.materialOverrideNames=[];for(const a of t)o.materialOverrideNames.push(a)}else Object.entries(t).forEach(([a,i])=>{const n=ge.arrayFromColorSpecification(i["model-color"]),r={color:n!==void 0?new qe(n[0],n[1],n[2]):new qe(1,1,1),colorMix:0,emissionStrength:0,opacity:1},l=i["model-color-mix-intensity"];l!==void 0&&(r.colorMix=l);const d=i["model-emissive-strength"];d!==void 0&&(r.emissionStrength=d);const c=i["model-opacity"];c!==void 0&&(r.opacity=c),o.materialOverrides.set(a,r)})}onAdd(o){this.map=o,this.load()}hasTransition(){return!1}loaded(){if(this._modelsInfo.size===0)return!0;for(const o of this._modelsInfo.values())if(o.model==null)return!1;return!0}getModels(){return this.models}loadTile(o,t){}serialize(){return this._options}setProperty(o,t){return!1}reload(){this.cancelModelRequests();const o=Kt(this.id,this.scope);this.map.style.clearSource(o),this.models=[],this._modelsInfo.clear(),this.load()}onRemove(o){this.cancelModelRequests()}setModels(o){this.models=[];const t=new Map;for(const a in o){const i=o[a],n=this._modelsInfo.get(a);n&&n.modelSpec.uri===i.uri&&t.set(a,n)}if(this._modelsInfo.size!==t.size){this.cancelModelRequests();for(const[a,i]of t)i.model||t.delete(a)}this._modelsInfo=t,this._options.models=o,this.load()}}const za={loaded:!0,drawModels:function(e,o,t,a){if(e.renderPass==="opaque")return;const i=t.paint.get("model-opacity").constantOr(1),n=t.paint.get("model-elevation-reference"),r=n==="ground",l=n==="ground";if(i===0)return;const d=t.paint.get("model-cast-shadows");if(e.renderPass==="shadow"&&(!d||e.terrain&&i<.65&&t._transitionablePaint._values["model-opacity"].value.expression instanceof xo))return;const c=e.shadowRenderer,m=t.paint.get("model-receive-shadows");c&&(c.useNormalOffset=!0,m||(c.enabled=!1));const u=()=>{c&&(c.useNormalOffset=!0,m||(c.enabled=!0))},_=o.getSource();if(e.renderPass==="light-beam"&&_.type!=="batched-model")return;if(_.type==="vector"||_.type==="geojson")return(function(s,T,h,A,w){const S=s.transform,E=S.projection.name==="globe",M=S.getFreeCameraOptions().position;if(!s.modelManager)return;const I=s.modelManager;h.modelManager=I;const B=s.shadowRenderer;if(!Object.hasOwn(h._unevaluatedLayout._values,"model-id"))return;const Y=h._unevaluatedLayout._values["model-id"],Oe={...h.layout.get("model-id").parameters},ie=s.style.order.indexOf(h.fqid),Q=h.paint.get("model-opacity").constantOr(1);for(const G of A){const C=T.getTile(G).getBucket(h);if(!C||C.projection.name!==S.projection.name)continue;const re=C.getModelUris();if(re&&!C.modelsRequested&&(I.addModelsFromBucket(re,w),C.modelsRequested=!0),E)Oe.zoom=G.overscaledZ;else{const O=ya(G,S);Oe.zoom=O}const K=Y.possiblyEvaluate(Oe);if(xa(s,C,G),le.shadowUniformsInitialized=!1,le.useSingleShadowCascade=!!B&&B.getMaxCascadeForTile(G.toUnwrapped())===0,s.renderPass==="shadow"&&B){if(s.currentShadowCascade===1&&C.isInsideFirstShadowMapFrustum)continue;const O=S.calculatePosMatrix(G.toUnwrapped(),S.worldSize);if(le.tileMatrix.set(O),le.shadowTileMatrix.set(B.calculateShadowPassMatrixFromMatrix(O)),le.aabb.min=[0,0,0],le.aabb.max[0]=le.aabb.max[1]=ve,le.aabb.max[2]=0,wa(C,le,s,h.scope))continue}const J=1<<G.canonical.z,L=[((M.x-G.wrap)*J-G.canonical.x)*ve,(M.y*J-G.canonical.y)*ve,M.z*J*ve];s.conflationActive&&Object.keys(C.instancesPerModel).length>0&&s.style.isLayerClipped(h,T.getSource())&&C.updateReplacement(G,s.replacementSource,ie,h.scope)&&(C.uploaded=!1,C.upload(s.context));let be=0;const De=new Array,Pe=new Array,Ne=new Array;for(let O in C.instancesPerModel){const ne=C.instancesPerModel[O];ne.features.length>0&&!E&&(O=K.evaluate(ne.features[0].feature,{}));const ee=I.getModel(O,w);if(ee||I.hasURLBeenRequested(O)||C.modelUris.includes(O)||(C.modelUris.push(O),C.modelsRequested=!1),ee&&ee.uploaded)if(E){const N=je([],[M.x,M.y,M.z],s.transform.worldSize);wt(N,N);for(let $=0;$<ne.instancedDataArray.length;++$){const k=[0,0,0],we=[1,1,1],ue=yo(),Te=ne.tileCoordinatesForInstance($),W=ne.transformForInstance($);bo(we,W),wo(ue,W),To(k,ue);const H=ne.translationForInstance($),te=new et(0,0);Ct(C.canonical,te,Te.x,Te.y);const Ie=Mo();Et(Ie,ee,s.transform,te,k,we,H,!0,!1,!1);const fe=ne.colorForInstance($),at=Tt([],N),it=Mt(te.lat,s.transform.zoom),Xe=St([],[1,1,1/it]);Ne.push({zScaleMatrix:Xe,negCameraPosMatrix:at});for(const R of ee.nodes)Ut(s,R,Ie,s.transform.expandedFarZProjMatrix,be,De,Pe,ee.materialOverrides,Q,fe);++be}}else for(const N of ee.nodes)so(s,h,N,ne,L,G,le)}if(E)if(s.renderPass==="shadow"){for(const O of Pe)Ke(O.mesh,O.nodeModelMatrix,s,h);for(const O of De)Ke(O.mesh,O.nodeModelMatrix,s,h)}else Zt(s,h,De,Pe,Ne)}})(e,o,t,a,$t(e,t)),void u();if(!_.loaded())return;if(_.type==="batched-model")return(function(s,T,h,A){h.resetLayerRenderingStats(s);const w=s.context,S=s.transform,E=s.style.fog,M=s.shadowRenderer;if(S.projection.name!=="mercator")return void So(`Drawing 3D landmark models for ${S.projection.name} projection is not yet implemented`);const I=s.transform.getFreeCameraOptions().position,B=je([],[I.x,I.y,I.z],s.transform.worldSize),Y=wt([],B),Oe=Tt([],Y),ie=Mt(S.center.lat,S.zoom),Q=St([],[1,1,1/ie]),G=F([],Oe,Q),C=h.paint.get("model-opacity").constantOr(1),re=new X(w.gl.LEQUAL,X.ReadWrite,s.depthRangeFor3D),K=new X(w.gl.LEQUAL,X.ReadOnly,s.depthRangeFor3D),J=new ot([1/0,1/0,1/0],[-1/0,-1/0,-1/0]),L=s.renderPass==="shadow",be=s.renderPass==="light-beam",De=h.paint.get("model-color-use-theme").constantOr("default")==="none",Pe=L&&M?M.getCurrentCascadeFrustum():S.getFrustum(S.scaleZoom(S.worldSize)),Ne=h.paint.get("model-front-cutoff"),O=Ne[2]<1,ne=gt(s,h.paint.get("model-cutoff-fade-range")),ee=h.getLayerRenderingStats();(function(N,$,k,we){const ue=N.terrain?N.terrain.exaggeration():0,Te=N.transform.zoom;for(const W of we){const H=$.getTile(W).getBucket(k);H&&(H.setFilter(k.filter),N.conflationActive&&H.updateReplacement(W,N.replacementSource),H.evaluateTransform(N,k),N.terrain&&ue>0&&H.elevationUpdate(N.terrain,ue,W,k.source),H.needsReEvaluation(N,Te,k)&&H.evaluate(k))}})(s,T,h,A),(function(){const N=new Map;let $,k,we;O?($=A.length-1,k=-1,we=-1):($=0,k=A.length,we=1);const ue=Ro(),Te=new Eo(0,0);for(let W=$;W!==k;W+=we){const H=A[W],te=T.getTile(H).getBucket(h);if(!te||!te.uploaded)continue;let Ie=!1;M&&(Ie=M.getMaxCascadeForTile(H.toUnwrapped())===0);const fe=S.calculatePosMatrix(H.toUnwrapped(),S.worldSize),at=!!(te.modelTraits&ia.HasMapboxMeshFeatures);F(Ft,G,fe),F(Ot,S.expandedFarZProjMatrix,fe),tt(_t,Ft),eo(_t,_t);const it=!L&&M&&M.enabled?M.computeCascadeTileMatrices(fe):null;!L&&O&&(tt(Fe,fe),ye(ue,B,Fe),Te.x=ue[0],Te.y=ue[1]);const Xe=[];te.setFilter(h.filter);for(const R of te.getNodesInfo()){if(R.hiddenByReplacement||!R.node.meshes)continue;const D=R.node;let U=0;s.terrain&&D.elevation&&(U=D.elevation*s.terrain.exaggeration());const oe=(()=>{const P=R.aabb,q=J.min,he=J.max;return q[0]=P.min[0],q[1]=P.min[1],q[2]=P.min[2]+U,he[0]=P.max[0],he[1]=P.max[1],he[2]=P.max[2]+U,ye(q,q,fe),ye(he,he,fe),J})(),j=R.evaluatedScale;if(j[0]<=1&&j[1]<=1&&j[2]<=1&&oe.intersects(Pe)===0)continue;if(!L){const P=oe.min,q=oe.max;ft[0]=.5*(P[0]+q[0]),ft[1]=.5*(P[1]+q[1]),ft[2]=.5*(P[2]+q[2]);const he=Ao(B,ft)*ie,Me=s._debugParams.lodSwitchDistance,z=Me>=0;if(z&&Me>=9999)R.targetLod=0;else{let pe;if(z)pe=Me;else{const ke=(q[2]-P[2])*ie*j[2],se=Math.max(q[0]-P[0],q[1]-P[1])*ie*Math.max(j[0],j[1]);let He;He=ke>=30?1:se>=80?.5:Math.max(ke,se)>=20?.25:0,pe=2e3+3e3*He}ba(R,he,Math.min(s.frameTimeDelta,1e3/30),pe,s._debugParams.lodSwitchFadeDuration)}}if(!L&&O){const P=.16666666666666666;R.cameraCollisionOpacity=B[0]>oe.min[0]&&B[0]<oe.max[0]&&B[1]>oe.min[1]&&B[1]<oe.max[1]&&B[2]*ie<oe.max[2]&&D.footprint&&Co(Te,D.footprint)?Math.max(R.cameraCollisionOpacity-P,0):Math.min(1,R.cameraCollisionOpacity+P)}const rt=1/jt(H.canonical),me=D.anchor?D.anchor[0]:0,Be=D.anchor?D.anchor[1]:0,Le=[me*(j[0]-1)+R.evaluatedTranslation[0]*rt,Be*(j[1]-1)+R.evaluatedTranslation[1]*rt,U+R.evaluatedTranslation[2]],Ge=Qe(new Float64Array(16),fe,Le,j),nt=F([],Ge,D.globalMatrix),ze=F([],S.expandedFarZProjMatrix,nt),st=ze[2]*me+ze[6]*Be+ze[10]*U+ze[14];D.hidden=!1;let Z=C;L||(O&&(Z*=R.cameraCollisionOpacity,Z*=Ma(Ge,S,R.aabb,Ne)),Z*=Ta(ne,st)),Z!==0?Xe.push({nodeInfo:R,depth:st,opacity:Z,wvpForNode:ze,nodeModelMatrix:nt,tileModelMatrix:Ge,tileTranslation:Le}):D.hidden=!0}L||Xe.sort((R,D)=>!O||R.opacity===1&&D.opacity===1?R.depth<D.depth?-1:1:R.opacity===1?-1:D.opacity===1?1:R.depth>D.depth?-1:1);for(const R of Xe){const D=R.nodeInfo,U=D.node;let oe=null;if(s._debugParams.show3DModelFootprints&&U.footprint){const Z=U.id||U.name||"footprint";if(!N.has(Z)){const P=Qe(new Float64Array(16),Ot,R.tileTranslation,R.nodeInfo.evaluatedScale);N.set(Z,{node:U,mvp:P})}}const j=R.nodeInfo.evaluatedScale;Qe(de,Ft,R.tileTranslation,j),ut[0]=1/j[0],ut[1]=-1/j[1],ut[2]=1/j[2],pt(Fe,_t,ut),F(de,de,U.globalMatrix);const rt=at?0:D.evaluatedRMEA[0][2],me=D.targetLod,Be=U.lodMeshes&&U.lodMeshes.length>0,Le=Be&&me>0&&me<1;if(L&&Be&&Math.round(me)===1)continue;const Ge=!L&&E?no(ro,R.nodeModelMatrix,s.transform):null,nt=L&&M?M.calculateShadowPassMatrixFromMatrix(R.nodeModelMatrix):null,ze=Le?2:1,st=Be&&Math.round(me)===1;for(let Z=0;Z<ze;++Z){const P=Le?Z===1:st,q=P?U.lodMeshes:U.meshes,he=Le?P?-me:1-me:1;for(let Me=0;Me<q.length;++Me){const z=q[Me],pe=!P&&Me===U.lightMeshIndex;let ke=R.wvpForNode;if(pe){if(!be&&!s.terrain&&s.shadowRenderer){s.currentLayer<s.firstLightBeamLayer&&(s.firstLightBeamLayer=s.currentLayer);continue}ke=Qe(ua,Ot,R.tileTranslation,R.nodeInfo.evaluatedScale)}else if(be)continue;const se={defines:[]},He=[],lt=!!z.normalBuffer;!L&&M&&(M.useNormalOffset=lt);const yt=pa(D,z);if(Ht(se.defines,He,z,s,De?null:h.lut,yt),at||se.defines.push("DIFFUSE_SHADED"),Ie&&se.defines.push("SHADOWS_SINGLE_CASCADE"),ee&&(L?ee.numRenderedVerticesInShadowPass+=z.vertexArray.length:ee.numRenderedVerticesInTransparentPass+=z.vertexArray.length),L){Ke(z,R.nodeModelMatrix,s,h,nt);continue}if(E&&S.projection.name!=="globe"){const Se=z.aabb.min,qt=z.aabb.max,[lo,co]=E.getOpacityForBounds(Ge,Se[0],Se[1],qt[0],qt[1]);se.overrideFog=lo>=vt||co>=vt}const Ve=z.material;let Vt;Ve.occlusionTexture&&Ve.occlusionTexture.offsetScale&&(Vt=Ve.occlusionTexture.offsetScale,se.defines.push("OCCLUSION_TEXTURE_TRANSFORM")),Le&&se.defines.push("DITHERED_DISCARD");const Ue=s.getOrCreateProgram("model",se);if(!L&&M&&M.enabled)if(oe!==lt){for(let Se=0;Se<it.length;Se++)Qe(Dt[Se]=Dt[Se]||new Float64Array(16),it[Se],R.tileTranslation,R.nodeInfo.evaluatedScale);M.setupShadowsFromCascadeMatrices(Dt,Ue,lt),oe=lt}else Ue.setShadowUniformValues(w,M.getShadowUniformValues());s.uploadCommonUniforms(w,Ue,null,Ge);const $e=Ve.pbrMetallicRoughness;$e.metallicFactor=.9,$e.roughnessFactor=.5;const bt=Gt(ke,de,Fe,U.globalMatrix,s,R.opacity,$e.baseColorFactor,Ve.emissiveFactor,$e.metallicFactor,$e.roughnessFactor,Ve,rt,h,ma,Vt,void 0,void 0,he,Ue.fixedDefines.includes("LIGHTING_3D_MODE"));bt.u_model_mesh_params=ha(z,U,pe,P),yt&&yt.bind(w,Ue.program),!pe&&(D.hasTranslucentParts||R.opacity<1)&&Ue.draw(s,w.gl.TRIANGLES,re,_e.disabled,ae.disabled,xe.backCCW,bt,h.id,z.vertexBuffer,z.indexBuffer,z.segments,h.paint,s.transform.zoom,void 0,He),Ue.draw(s,w.gl.TRIANGLES,pe?K:re,_e.disabled,pe||R.opacity<1||D.hasTranslucentParts?ae.alphaBlended:ae.unblended,xe.backCCW,bt,h.id,z.vertexBuffer,z.indexBuffer,z.segments,h.paint,s.transform.zoom,void 0,He)}}}}if(s._debugParams.show3DModelFootprints&&N.size>0){const W=Array.from(N.keys()).sort();for(const H of W){const{node:te,mvp:Ie}=N.get(H);Wt(s,0,te,Ie)}}})()})(e,o,t,a),void u();if(_.type!=="model")return;const f=_.getModels(),g=[],p=e.transform.getFreeCameraOptions().position,x=je([],[p.x,p.y,p.z],e.transform.worldSize);wt(x,x);const y=[],v=[];let b=0;for(const s of f){const T=o.getFeatureState("",s.id),h={type:"Unknown",id:s.id,properties:s.featureProperties},A=t.paint.get("model-rotation").evaluate(h,T),w=t.paint.get("model-scale").evaluate(h,T),S=t.paint.get("model-translation").evaluate(h,T),E=t.paint.get("model-opacity").evaluate(h,T);ga(t,s.id,T,s.featureProperties,s.nodeOverrideNames,s.nodeOverrides),va(t,s.id,T,s.featureProperties,s.materialOverrideNames,s.materialOverrides),s.nodeOverrides.size>0&&s.computeBoundsAndApplyParent(),s.computeModelMatrix(e,A,w,S,l,r,!1);const M=Tt([],x),I=Mt(s.position.lat,e.transform.zoom),B=St([],[1,1,1/I]);g.push({zScaleMatrix:B,negCameraPosMatrix:M});for(const Y of s.nodes)Ut(e,Y,s.matrix,e.transform.expandedFarZProjMatrix,b,y,v,s.materialOverrides,E,void 0,s.lightOverrides);b++}if(y.sort((s,T)=>T.depth-s.depth),e.renderPass!=="shadow"){if(e._debugParams.show3DModelFootprints){const s=e.transform.projMatrix,T=new Map,h=(w,S)=>{if(w.footprint){const E=w.id||w.name||"footprint";if(!T.has(E)){const M=F([],s,S);T.set(E,{node:w,mvp:M})}}};for(const w of v)h(w.node,w.modelMatrix);for(const w of y)h(w.node,w.modelMatrix);const A=Array.from(T.keys()).sort();for(const w of A){const{node:S,mvp:E}=T.get(w);Wt(e,0,S,E)}}Zt(e,t,y,v,g),u()}else{for(const s of v)Ke(s.mesh,s.nodeModelMatrix,e,t);for(const s of y)Ke(s.mesh,s.nodeModelMatrix,e,t);u()}},prepare:function(e,o,t){const a=o.getSource();if(!a.loaded())return;if(a.type==="vector"||a.type==="geojson")return void(t.modelManager&&t.modelManager.upload(t,$t(t,e)));if(a.type==="batched-model"||a.type!=="model")return;const i=a.getModels();for(const n of i)n.upload(t.context)},shaders:Sa,programUniforms:Ea,ShadowRenderer:class{constructor(e){this.painter=e,this._enabled=!1,this._drawShadowAfterLayer=-1,this._numCascadesToRender=0,this._cascades=[],this._groundShadowTiles=[],this._receivers=new Fa,this._depthMode=new X(e.context.gl.LEQUAL,X.ReadWrite,[0,1]),this._uniformValues=ho(),this._forceDisable=!1,this._devtoolsFolder=null,this.useNormalOffset=!1,this._shadowParameters={cascadeCount:2,normalOffset:3,shadowMapResolution:2048}}destroy(){for(const e of this._cascades)e.texture.destroy(),e.framebuffer.destroy();this._cascades=[]}_hasCasterGeometry(e,o){const t=this.painter.style.getLayerSourceCache(e);if(!t)return!1;const a=t.getSource();if(a.type==="model")return a.getModels().length>0;const i=o[t.id];if(!i)return!1;for(const n of i){const r=t.getTile(n);if(r&&r.getBucket(e))return!0}return!1}updateShadowParameters(e,o,t){const a=this.painter;if(this._enabled=!1,this._drawShadowAfterLayer=-1,this._receivers.clear(),!o||!o.properties)return;const i=o.properties.get("shadow-intensity"),n=o.properties.get("shadow-draw-before-layer");if(!o.shadowsEnabled()||i<=0)return;let r=-1,l=0;for(const y of a.style.order){const v=a.style._mergedLayers[y];v.hasShadowPass()&&!v.isHidden(e.zoom)&&this._hasCasterGeometry(v,t)&&(r=l),!n||n!==y&&n!==v.slot||(this._drawShadowAfterLayer=l>0?l-1:0),l+=1}if(this._enabled=r>=0,!this.enabled)return;this._drawShadowAfterLayer<0&&(this._drawShadowAfterLayer=r);const d=a.context,c=this._shadowParameters.shadowMapResolution,m=this._shadowParameters.shadowMapResolution;if(this._cascades.length===0||this._shadowParameters.shadowMapResolution!==this._cascades[0].texture.size[0]){this._cascades=[];for(let y=0;y<this._shadowParameters.cascadeCount;++y){const v=d.gl,b=d.createFramebuffer(c,m,0,"texture"),s=new po(d,{width:c,height:m,data:null},v.DEPTH_COMPONENT16);b.depthAttachment.set(s.texture),this._cascades.push({framebuffer:b,texture:s,matrix:[],far:0,boundingSphereRadius:0,frustum:new Nt,scale:0})}}this.shadowDirection=go(o);let u=0;if(e.elevation){const y=e.elevation,v=[1e4,-1e4];y.visibleDemTiles.filter(b=>b.dem).forEach(b=>{const s=b.dem.tree;v[0]=Math.min(v[0],s.minimums[0]),v[1]=Math.max(v[1],s.maximums[0])}),v[0]!==1e4&&(u=(v[1]-v[0])*y.exaggeration())}const _=1.5*e.cameraToCenterDistance,f=3*_,g=new Float64Array(16);for(let y=0;y<this._cascades.length;++y){const v=this._cascades[y];let b=e.height/50,s=1;this._shadowParameters.cascadeCount===1?s=f:y===0?s=_:(b=_,s=f);const[T,h]=Oa(e,this.shadowDirection,b,s,this._shadowParameters.shadowMapResolution,u);v.scale=e.scale,v.matrix=T,v.boundingSphereRadius=h,tt(g,v.matrix),v.frustum=Nt.fromInvProjectionMatrix(g,1,0,!0),v.far=s}const p=this._cascades.length-1;this._uniformValues.u_fade_range=[.75*this._cascades[p].far,this._cascades[p].far],this._uniformValues.u_shadow_intensity=i,this._uniformValues.u_shadow_direction=[this.shadowDirection[0],this.shadowDirection[1],this.shadowDirection[2]],this._uniformValues.u_shadow_texel_size=1/this._shadowParameters.shadowMapResolution,this._uniformValues.u_shadow_map_resolution=this._shadowParameters.shadowMapResolution,this._uniformValues.u_shadowmap_0=V.ShadowMap0,this._uniformValues.u_shadowmap_1=V.ShadowMap0+1,this._groundShadowTiles=a.transform.coveringTiles({tileSize:512,renderWorldCopies:!0});const x=a.transform.elevation;for(const y of this._groundShadowTiles){let v={min:0,max:0};if(x){const b=x.getMinMaxForTile(y);b&&(v=b)}this.addShadowReceiver(y.toUnwrapped(),v.min,v.max)}}get enabled(){return this._enabled&&!this._forceDisable}set enabled(e){this._enabled=e}drawShadowPass(e,o){if(!this.enabled)return;const t=this.painter,a=t.context;this._numCascadesToRender=this._receivers.computeRequiredCascades(t.transform.getFrustum(0),t.transform.worldSize,this._cascades),a.viewport.set([0,0,this._shadowParameters.shadowMapResolution,this._shadowParameters.shadowMapResolution]);for(let i=0;i<this._numCascadesToRender;++i){t.currentShadowCascade=i,a.bindFramebuffer.set(this._cascades[i].framebuffer.framebuffer),a.clear({color:qe.white,depth:1});for(const n of e.order){const r=e._mergedLayers[n];if(!r.hasShadowPass()||r.isHidden(t.transform.zoom))continue;const l=e.getLayerSourceCache(r),d=l?o[l.id]:void 0;(r.type==="model"||d&&d.length)&&t.renderLayer(t,l,r,d)}}t.currentShadowCascade=0}drawGroundShadows(){if(!this.enabled)return;const e=this.painter,o=e.style,t=e.context,a=t.gl,i=o.directionalLight,n=o.ambientLight;if(!i||!n)return;const r=[],l=gt(e,e.longestCutoffRange);l.shouldRenderCutoff&&r.push("RENDER_CUTOFF"),r.push("RENDER_SHADOWS"),this.useNormalOffset&&r.push("NORMAL_OFFSET");const d=vo(o,i,n),c=new X(a.LEQUAL,X.ReadOnly,e.depthRangeFor3D),m=new _e({func:a.EQUAL,mask:255},0,255,a.KEEP,a.KEEP,a.KEEP);for(const u of this._groundShadowTiles){const _=u.toUnwrapped(),f=e.isTileAffectedByFog(u),g=e.getOrCreateProgram("groundShadow",{defines:r,overrideFog:f});this.setupShadows(_,g),e.uploadCommonUniforms(t,g,_,null,l);const p=Ra(e.transform.calculateProjMatrix(_),d);g.draw(e,a.TRIANGLES,c,m,ae.multiply,xe.disabled,p,"ground_shadow",e.tileExtentBuffer,e.quadTriangleIndexBuffer,e.tileExtentSegments,null,e.transform.zoom,null,null)}}getShadowPassDepthMode(){return this._depthMode}getGroundShadowLayerIndex(){return this._drawShadowAfterLayer}calculateShadowPassMatrixFromTile(e){const o=this.painter.transform,t=o.calculatePosMatrix(e,o.worldSize);return F(t,this._cascades[this.painter.currentShadowCascade].matrix,t),Float32Array.from(t)}calculateShadowPassMatrixFromMatrix(e){return F(Aa,this._cascades[this.painter.currentShadowCascade].matrix,e)}setupShadows(e,o,t){if(!this.enabled)return;const a=this.painter.transform,i=this.painter.context,n=i.gl,r=this._uniformValues,l=a.calculatePosMatrix(e,a.worldSize);for(let d=0;d<this._cascades.length;d++){const c=Yt(d);F(c,this._cascades[d].matrix,l),r[d===0?"u_light_matrix_0":"u_light_matrix_1"]=c,i.activeTexture.set(n.TEXTURE0+V.ShadowMap0+d),this._cascades[d].texture.bindExtraParam(n.LINEAR,n.LINEAR,n.CLAMP_TO_EDGE,n.CLAMP_TO_EDGE,n.GREATER)}if(this.useNormalOffset=!!t,this.useNormalOffset){const d=jt(e.canonical),c=2/a.tileSize*ve/this._shadowParameters.shadowMapResolution,m=c*this._cascades[0].boundingSphereRadius,u=c*this._cascades.at(-1).boundingSphereRadius,_=(t==="vector-tile"?1:3)*(function(f){const g=ce((f-22)/-22,0,1);return .125*(1-g)+4*g})(a.zoom);r.u_shadow_normal_offset=[d,m*_,u*_],r.u_shadow_bias=[1e-4,.0012,.012]}else r.u_shadow_bias=[36e-5,.0012,.012];o.setShadowUniformValues(i,r)}computeCascadeTileMatrices(e){const o=this._shadowParameters.cascadeCount;for(let t=0;t<o;t++){const a=mt[t]=mt[t]||new Float64Array(16);F(a,this._cascades[t].matrix,e)}return mt.length=o,mt}setupShadowsFromMatrix(e,o,t=!1){if(!this.enabled)return;const a=this._shadowParameters.cascadeCount;for(let i=0;i<a;i++)F(Yt(i),this._cascades[i].matrix,e);xt.length=a,this.setupShadowsFromCascadeMatrices(xt,o,t)}setupShadowsFromCascadeMatrices(e,o,t=!1){if(!this.enabled)return;const a=this.painter.context,i=a.gl,n=this._uniformValues;for(let r=0;r<this._shadowParameters.cascadeCount;r++)n[r===0?"u_light_matrix_0":"u_light_matrix_1"]=e[r],a.activeTexture.set(i.TEXTURE0+V.ShadowMap0+r),this._cascades[r].texture.bindExtraParam(i.LINEAR,i.LINEAR,i.CLAMP_TO_EDGE,i.CLAMP_TO_EDGE,i.GREATER);if(this.useNormalOffset=t,t){const r=this._shadowParameters.normalOffset;n.u_shadow_normal_offset=[1,r,r],n.u_shadow_bias=[6e-5,.0012,.012]}else n.u_shadow_bias=[36e-5,.0012,.012];o.setShadowUniformValues(a,n)}getShadowUniformValues(){return this._uniformValues}getCurrentCascadeFrustum(){return this._cascades[this.painter.currentShadowCascade].frustum}computeSimplifiedTileShadowVolume(e,o,t,a){if(a[2]>=0)return{};const i=(function(l,d,c){const m=c/(1<<l.canonical.z);return new ot([l.canonical.x*m+l.wrap*c,l.canonical.y*m+l.wrap*c,0],[(l.canonical.x+1)*m+l.wrap*c,(l.canonical.y+1)*m+l.wrap*c,d])})(e,o,t).getCorners(),n=o/-a[2];a[0]<0?(Ce(i[0],i[0],[a[0]*n,0,0]),Ce(i[3],i[3],[a[0]*n,0,0])):a[0]>0&&(Ce(i[1],i[1],[a[0]*n,0,0]),Ce(i[2],i[2],[a[0]*n,0,0])),a[1]<0?(Ce(i[0],i[0],[0,a[1]*n,0]),Ce(i[1],i[1],[0,a[1]*n,0])):a[1]>0&&(Ce(i[2],i[2],[0,a[1]*n,0]),Ce(i[3],i[3],[0,a[1]*n,0]));const r={};return r.vertices=i,r.planes=[ht(i[1],i[0],i[4]),ht(i[2],i[1],i[5]),ht(i[3],i[2],i[6]),ht(i[0],i[3],i[7])],r}addShadowReceiver(e,o,t){this._receivers.add(e,ot.fromTileIdAndHeight(e,o,t))}getMaxCascadeForTile(e){const o=this._receivers.get(e);return o&&o.lastCascade?o.lastCascade:0}},drawGroundEffect:ca,queryModelLayerRendered:function(e,o,t,a){const i=t.getSource();if(!i||i.type!=="model")return{};const n=i,r={};r[e.id]=[];const l=r[e.id];let d=0;for(const c of n.models){const m=t.getFeatureState(e.sourceLayer,c.id),u={type:"Unknown",id:c.id,properties:c.featureProperties},_=e.paint.get("model-rotation").evaluate(u,m),f=e.paint.get("model-scale").evaluate(u,m),g=e.paint.get("model-translation").evaluate(u,m),p=e.paint.get("model-elevation-reference");let x=[];Et(x,c,a,c.position,_,f,g,p==="ground",p==="ground",!1),a.projection.name==="globe"&&(x=Lt(x,a));const y=F([],a.projMatrix,x),v=o.isPointQuery()?o.screenBounds:o.screenGeometry,b=At(v,a,y,c.aabb);if(b!=null){const s=new mo(void 0,0,0,0,c.id);s.layer=e.layer,s.properties=structuredClone(c.featureProperties),s.properties.layer=e.id,s.properties.uri=c.uri,s.properties.orientation=c.orientation,s.sourceLayer=e.sourceLayer,s.geometry={type:"Point",coordinates:[c.position.lng,c.position.lat]},s.state=m,s.source=e.source,l.push({featureIndex:d,feature:s,intersectionZ:b})}++d}return r},queryModelLayerIntersectsFeature:function(e,o,t,a,i,n){if(!e.modelManager)return!1;const r=e.modelManager,l=o.tile.getBucket(e);if(!(l&&l instanceof da))return!1;for(const d in l.instancesPerModel){const c=l.instancesPerModel[d],m=t.id!==void 0?t.id:t.properties&&Object.hasOwn(t.properties,"id")?t.properties.id:void 0;if(Object.hasOwn(c.idToFeaturesIndex,m)){const u=c.features[c.idToFeaturesIndex[m]],_=r.getModel(d,n||e.scope);if(!_)return!1;let f=[];const g=new et(0,0),p=l.canonical;let x=Number.MAX_VALUE;for(let y=0;y<u.instancedDataCount;++y){const v=16*(u.instancedDataOffset+y),b=c.instancedDataArray.float32,s=[b[v+4],b[v+5],b[v+6]];Ct(p,g,Math.floor(b[v]),Math.floor(b[v+1])),Et(f,_,i,g,u.rotation,u.scale,s,!1,!1,!1),i.projection.name==="globe"&&(f=Lt(f,i));const T=F([],i.projMatrix,f),h=o.queryGeometry,A=h.isPointQuery()?h.screenBounds:h.screenGeometry,w=At(A,i,T,_.aabb);w!=null&&(x=Math.min(w,x))}return x!==Number.MAX_VALUE&&x}}return!1},loadMatchingModelFeature:function(e,o,t,a){const i=e.getNodesInfo()[o];if(!i||i.hiddenByReplacement||!i.node.meshes)return;let n=Number.MAX_VALUE;const r=i.node,l=t.tile,d=a.calculatePosMatrix(l.tileID.toUnwrapped(),a.worldSize),c=i.evaluatedScale;let m=0;a.elevation&&r.elevation&&(m=r.elevation*a.elevation.exaggeration()),Bt(d,d,[(r.anchor?r.anchor[0]:0)*(c[0]-1),(r.anchor?r.anchor[1]:0)*(c[1]-1),m]),pt(d,d,c);const u=t.queryGeometry,_=u.isPointQuery()?u.screenBounds:u.screenGeometry,f=function(p){const x=F([],d,p.globalMatrix);F(x,a.expandedFarZProjMatrix,x);for(let y=0;y<p.meshes.length;++y){const v=p.meshes[y];if(y===p.lightMeshIndex)continue;const b=At(_,a,x,v.aabb);b!=null&&(n=Math.min(b,n))}if(p.children)for(const y of p.children)f(y)};if(f(r),n===Number.MAX_VALUE)return;const g=new et(0,0);return Ct(l.tileID.canonical,g,i.node.anchor[0],i.node.anchor[1]),{intersectionZ:n,position:g,feature:i.feature}},ModelSource:ge,Tiled3dModelSource:class extends Qt{constructor(e,o,t,a){super(),this.type="batched-model",this.id=e,this.tileSize=512,this._options=o,this.tiles=this._options.tiles,this.maxzoom=o.maxzoom||19,this.minzoom=o.minzoom||0,this.roundZoom=!0,this.usedInConflation=!0,this.dispatcher=t,this.reparseOverscaled=!1,this.scheme="xyz",this._loaded=!1,this.setEventedParent(a)}onAdd(e){this.map=e,this.load()}reload(){this.cancelTileJSONRequest();const e=Kt(this.id,this.scope);this.load(()=>this.map.style.clearSource(e))}cancelTileJSONRequest(){this._tileJSONRequest&&(this._tileJSONRequest.cancel(),this._tileJSONRequest=null)}load(e){this._loaded=!1,this.fire(new Je("dataloading",{dataType:"source"}));const o=Array.isArray(this.map._language)?this.map._language.join():this.map._language,t=this.map.getWorldview();this._tileJSONRequest=uo(this._options,this.map._requestManager,o,t,(a,i)=>{this._tileJSONRequest=null,this._loaded=!0,a?(o&&console.warn(`Ensure that your requested language string is a valid BCP-47 code or list of codes. Found: ${o}`),t&&t.length!==2&&console.warn(`Requested worldview strings must be a valid ISO alpha-2 code. Found: ${t}`),this.fire(new to(a))):i&&(Object.assign(this,i),this.tileBounds=new ta(i),oa(i.tiles,this.map._requestManager._customAccessToken),this.fire(new Je("data",{dataType:"source",sourceDataType:"metadata"})),this.fire(new Je("data",{dataType:"source",sourceDataType:"content"}))),e&&e(a)})}hasTransition(){return!1}hasTile(e){return!this.tileBounds||this.tileBounds.contains(e.canonical)}loaded(){return this._loaded}async loadTile(e,o){const t=this.map._requestManager.normalizeTileURL(e.tileID.canonical.url(this.tiles,this.scheme)),a=!e.actor||e.state==="expired";if(a)e.actor=this.dispatcher.getActor();else{if(e.state==="loading")return void(e.reloadCallback=o);if(e.buckets){const l=Object.values(e.buckets);for(const d of l)d.dirty=!0;return void(e.state="loaded")}}const i=a?"loadTile":"reloadTile",n=new AbortController;e.request=n;const r=(l,d)=>(delete e.request,e.aborted?o(null):l&&!Fo(l)?o(l):(this.map._refreshExpiredTiles&&d&&e.setExpiryData(Oo(d.headers)),e.loadModelData(d,this.map.painter),e.state="loaded",o(null),void(e.reloadCallback&&(this.loadTile(e,e.reloadCallback),e.reloadCallback=null))));try{const l=await this.map._requestManager.transformRequest(t,Jt.Tile,n.signal);if(n.signal.aborted)return o(null);const d={request:l,data:void 0,uid:e.uid,tileID:e.tileID,tileZoom:e.tileZoom,zoom:e.tileID.overscaledZ,tileSize:this.tileSize*e.tileID.overscaleFactor(),type:this.type,source:this.id,scope:this.scope,showCollisionBoxes:this.map.showCollisionBoxes,renderSourceType:e.renderSourceType,brightness:this.map.style&&this.map.style.getBrightness()||0,pixelRatio:fo.devicePixelRatio,promoteId:this.promoteId};e.request=e.actor.sendCancelable(i,d,{},r)}catch(l){if(n.signal.aborted)return o(null);o(l)}}abortTile(e){e.request&&(e.request.abort(),delete e.request),e.actor&&e.actor.notify("abortTile",{uid:e.uid,type:this.type,source:this.id,scope:this.scope})}serialize(){return{...this._options}}},loadModel:aa};export{za as Standard};
