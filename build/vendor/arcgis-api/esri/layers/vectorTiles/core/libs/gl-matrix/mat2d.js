//>>built
define("esri/layers/vectorTiles/core/libs/gl-matrix/mat2d",["./common"],function(k){var d={create:function(){var a=new k.ARRAY_TYPE(6);a[0]=1;a[1]=0;a[2]=0;a[3]=1;a[4]=0;a[5]=0;return a},clone:function(a){var b=new k.ARRAY_TYPE(6);b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];return b},copy:function(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];return a},identity:function(a){a[0]=1;a[1]=0;a[2]=0;a[3]=1;a[4]=0;a[5]=0;return a},fromValues:function(a,b,c,h,l,g){var e=
new k.ARRAY_TYPE(6);e[0]=a;e[1]=b;e[2]=c;e[3]=h;e[4]=l;e[5]=g;return e},set:function(a,b,c,h,l,g,e){a[0]=b;a[1]=c;a[2]=h;a[3]=l;a[4]=g;a[5]=e;return a},invert:function(a,b){var c=b[0],h=b[1],l=b[2],g=b[3],e=b[4],d=b[5],f=c*g-h*l;if(!f)return null;f=1/f;a[0]=g*f;a[1]=-h*f;a[2]=-l*f;a[3]=c*f;a[4]=(l*d-g*e)*f;a[5]=(h*e-c*d)*f;return a},determinant:function(a){return a[0]*a[3]-a[1]*a[2]},multiply:function(a,b,c){var h=b[0],d=b[1],g=b[2],e=b[3],q=b[4];b=b[5];var f=c[0],k=c[1],m=c[2],n=c[3],p=c[4];c=c[5];
a[0]=h*f+g*k;a[1]=d*f+e*k;a[2]=h*m+g*n;a[3]=d*m+e*n;a[4]=h*p+g*c+q;a[5]=d*p+e*c+b;return a}};d.mul=d.multiply;d.rotate=function(a,b,c){var h=b[0],d=b[1],g=b[2],e=b[3],k=b[4];b=b[5];var f=Math.sin(c);c=Math.cos(c);a[0]=h*c+g*f;a[1]=d*c+e*f;a[2]=h*-f+g*c;a[3]=d*-f+e*c;a[4]=k;a[5]=b;return a};d.scale=function(a,b,c){var h=b[1],d=b[2],g=b[3],e=b[4],k=b[5],f=c[0];c=c[1];a[0]=b[0]*f;a[1]=h*f;a[2]=d*c;a[3]=g*c;a[4]=e;a[5]=k;return a};d.translate=function(a,b,c){var h=b[0],d=b[1],g=b[2],e=b[3],k=b[4];b=b[5];
var f=c[0];c=c[1];a[0]=h;a[1]=d;a[2]=g;a[3]=e;a[4]=h*f+g*c+k;a[5]=d*f+e*c+b;return a};d.fromRotation=function(a,b){var c=Math.sin(b),d=Math.cos(b);a[0]=d;a[1]=c;a[2]=-c;a[3]=d;a[4]=0;a[5]=0;return a};d.fromScaling=function(a,b){a[0]=b[0];a[1]=0;a[2]=0;a[3]=b[1];a[4]=0;a[5]=0;return a};d.fromTranslation=function(a,b){a[0]=1;a[1]=0;a[2]=0;a[3]=1;a[4]=b[0];a[5]=b[1];return a};d.str=function(a){return"mat2d("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+")"};d.frob=function(a){return Math.sqrt(Math.pow(a[0],
2)+Math.pow(a[1],2)+Math.pow(a[2],2)+Math.pow(a[3],2)+Math.pow(a[4],2)+Math.pow(a[5],2)+1)};d.add=function(a,b,c){a[0]=b[0]+c[0];a[1]=b[1]+c[1];a[2]=b[2]+c[2];a[3]=b[3]+c[3];a[4]=b[4]+c[4];a[5]=b[5]+c[5];return a};d.subtract=function(a,b,c){a[0]=b[0]-c[0];a[1]=b[1]-c[1];a[2]=b[2]-c[2];a[3]=b[3]-c[3];a[4]=b[4]-c[4];a[5]=b[5]-c[5];return a};d.sub=d.subtract;d.multiplyScalar=function(a,b,c){a[0]=b[0]*c;a[1]=b[1]*c;a[2]=b[2]*c;a[3]=b[3]*c;a[4]=b[4]*c;a[5]=b[5]*c;return a};d.multiplyScalarAndAdd=function(a,
b,c,d){a[0]=b[0]+c[0]*d;a[1]=b[1]+c[1]*d;a[2]=b[2]+c[2]*d;a[3]=b[3]+c[3]*d;a[4]=b[4]+c[4]*d;a[5]=b[5]+c[5]*d;return a};d.exactEquals=function(a,b){return a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]&&a[3]===b[3]&&a[4]===b[4]&&a[5]===b[5]};d.equals=function(a,b){var c=a[0],d=a[1],l=a[2],g=a[3],e=a[4],q=a[5],f=b[0],r=b[1],m=b[2],n=b[3],p=b[4],s=b[5];return Math.abs(c-f)<=k.EPSILON*Math.max(1,Math.abs(c),Math.abs(f))&&Math.abs(d-r)<=k.EPSILON*Math.max(1,Math.abs(d),Math.abs(r))&&Math.abs(l-m)<=k.EPSILON*Math.max(1,
Math.abs(l),Math.abs(m))&&Math.abs(g-n)<=k.EPSILON*Math.max(1,Math.abs(g),Math.abs(n))&&Math.abs(e-p)<=k.EPSILON*Math.max(1,Math.abs(e),Math.abs(p))&&Math.abs(q-s)<=k.EPSILON*Math.max(1,Math.abs(q),Math.abs(s))};return d});