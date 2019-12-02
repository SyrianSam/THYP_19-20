/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./defined-2a4f2d00","./Check-e5651467","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./Transforms-5119c07b","./ComponentDatatype-418b1c61","./GeometryAttribute-8bc1900e","./GeometryAttributes-f8548d3f","./IndexDatatype-2bcfc06b","./GeometryOffsetAttribute-fa4e7a11","./EllipseGeometryLibrary-d9b0e4d2"],function(e,A,t,_,g,v,x,E,M,C,G,L,O){"use strict";var V=new v.Cartesian3,u=new v.Cartesian3;var S=new x.BoundingSphere,w=new x.BoundingSphere;function c(e){var t=(e=_.defaultValue(e,_.defaultValue.EMPTY_OBJECT)).center,i=_.defaultValue(e.ellipsoid,v.Ellipsoid.WGS84),r=e.semiMajorAxis,a=e.semiMinorAxis,n=_.defaultValue(e.granularity,g.CesiumMath.RADIANS_PER_DEGREE),o=_.defaultValue(e.height,0),s=_.defaultValue(e.extrudedHeight,o);this._center=v.Cartesian3.clone(t),this._semiMajorAxis=r,this._semiMinorAxis=a,this._ellipsoid=v.Ellipsoid.clone(i),this._rotation=_.defaultValue(e.rotation,0),this._height=Math.max(s,o),this._granularity=n,this._extrudedHeight=Math.min(s,o),this._numberOfVerticalLines=Math.max(_.defaultValue(e.numberOfVerticalLines,16),0),this._offsetAttribute=e.offsetAttribute,this._workerName="createEllipseOutlineGeometry"}c.packedLength=v.Cartesian3.packedLength+v.Ellipsoid.packedLength+8,c.pack=function(e,t,i){return i=_.defaultValue(i,0),v.Cartesian3.pack(e._center,t,i),i+=v.Cartesian3.packedLength,v.Ellipsoid.pack(e._ellipsoid,t,i),i+=v.Ellipsoid.packedLength,t[i++]=e._semiMajorAxis,t[i++]=e._semiMinorAxis,t[i++]=e._rotation,t[i++]=e._height,t[i++]=e._granularity,t[i++]=e._extrudedHeight,t[i++]=e._numberOfVerticalLines,t[i]=_.defaultValue(e._offsetAttribute,-1),t};var m=new v.Cartesian3,h=new v.Ellipsoid,y={center:m,ellipsoid:h,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};c.unpack=function(e,t,i){t=_.defaultValue(t,0);var r=v.Cartesian3.unpack(e,t,m);t+=v.Cartesian3.packedLength;var a=v.Ellipsoid.unpack(e,t,h);t+=v.Ellipsoid.packedLength;var n=e[t++],o=e[t++],s=e[t++],l=e[t++],u=e[t++],d=e[t++],f=e[t++],p=e[t];return A.defined(i)?(i._center=v.Cartesian3.clone(r,i._center),i._ellipsoid=v.Ellipsoid.clone(a,i._ellipsoid),i._semiMajorAxis=n,i._semiMinorAxis=o,i._rotation=s,i._height=l,i._granularity=u,i._extrudedHeight=d,i._numberOfVerticalLines=f,i._offsetAttribute=-1===p?void 0:p,i):(y.height=l,y.extrudedHeight=d,y.granularity=u,y.rotation=s,y.semiMajorAxis=n,y.semiMinorAxis=o,y.numberOfVerticalLines=f,y.offsetAttribute=-1===p?void 0:p,new c(y))},c.createGeometry=function(e){if(!(e._semiMajorAxis<=0||e._semiMinorAxis<=0)){var t=e._height,i=e._extrudedHeight,r=!g.CesiumMath.equalsEpsilon(t,i,0,g.CesiumMath.EPSILON2);e._center=e._ellipsoid.scaleToGeodeticSurface(e._center,e._center);var a,n={center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,ellipsoid:e._ellipsoid,rotation:e._rotation,height:t,granularity:e._granularity,numberOfVerticalLines:e._numberOfVerticalLines};if(r)n.extrudedHeight=i,n.offsetAttribute=e._offsetAttribute,a=function(e){var t=e.center,i=e.ellipsoid,r=e.semiMajorAxis,a=v.Cartesian3.multiplyByScalar(i.geodeticSurfaceNormal(t,V),e.height,V);S.center=v.Cartesian3.add(t,a,S.center),S.radius=r,a=v.Cartesian3.multiplyByScalar(i.geodeticSurfaceNormal(t,a),e.extrudedHeight,a),w.center=v.Cartesian3.add(t,a,w.center),w.radius=r;var n=O.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,o=new C.GeometryAttributes({position:new M.GeometryAttribute({componentDatatype:E.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:O.EllipseGeometryLibrary.raisePositionsToHeight(n,e,!0)})});n=o.position.values;var s=x.BoundingSphere.union(S,w),l=n.length/3;if(A.defined(e.offsetAttribute)){var u=new Uint8Array(l);if(e.offsetAttribute===L.GeometryOffsetAttribute.TOP)u=L.arrayFill(u,1,0,l/2);else{var d=e.offsetAttribute===L.GeometryOffsetAttribute.NONE?0:1;u=L.arrayFill(u,d)}o.applyOffset=new M.GeometryAttribute({componentDatatype:E.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:u})}var f=_.defaultValue(e.numberOfVerticalLines,16);f=g.CesiumMath.clamp(f,0,l/2);var p=G.IndexDatatype.createTypedArray(l,2*l+2*f);l/=2;var c,m,h=0;for(c=0;c<l;++c)p[h++]=c,p[h++]=(c+1)%l,p[h++]=c+l,p[h++]=(c+1)%l+l;if(0<f){var y=Math.min(f,l);m=Math.round(l/y);var b=Math.min(m*f,l);for(c=0;c<b;c+=m)p[h++]=c,p[h++]=c+l}return{boundingSphere:s,attributes:o,indices:p}}(n);else if(a=function(e){var t=e.center;u=v.Cartesian3.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t,u),e.height,u),u=v.Cartesian3.add(t,u,u);for(var i=new x.BoundingSphere(u,e.semiMajorAxis),r=O.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,a=new C.GeometryAttributes({position:new M.GeometryAttribute({componentDatatype:E.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:O.EllipseGeometryLibrary.raisePositionsToHeight(r,e,!1)})}),n=r.length/3,o=G.IndexDatatype.createTypedArray(n,2*n),s=0,l=0;l<n;++l)o[s++]=l,o[s++]=(l+1)%n;return{boundingSphere:i,attributes:a,indices:o}}(n),A.defined(e._offsetAttribute)){var o=a.attributes.position.values.length,s=new Uint8Array(o/3),l=e._offsetAttribute===L.GeometryOffsetAttribute.NONE?0:1;L.arrayFill(s,l),a.attributes.applyOffset=new M.GeometryAttribute({componentDatatype:E.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:s})}return new M.Geometry({attributes:a.attributes,indices:a.indices,primitiveType:M.PrimitiveType.LINES,boundingSphere:a.boundingSphere,offsetAttribute:e._offsetAttribute})}},e.EllipseOutlineGeometry=c});
