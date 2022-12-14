/**
 * This config file is used to set the confidence level for the Integrated alerts layer in GFWIntegratedLayer.ts.
 * Confirming order of bits based on alpha value is: 00 10 01 00 --> no GLAD-L, high conf GLAD-S2, low conf RADD
 * one key was the extra "unused" bits shift the row number to become the 4, 8 16, 20 pattern.  This chart is my proposed understanding of "Agreement Value".
 * In plain English, how the sensors agree as to the confidence of the alert for that pixel.
 * notice, shifting the bits over two places (with the unused bits) turns combo #8 to #32.  Each shift in binary doubles a number, so two shifts is same as x4.
 * the colors are simplified from there:
 * light if only one low value
 * dark if more than one value
 * medium for everything else
 *  We broke down the config file with the following spreadsheet: https://blueraster.sharepoint.com/:x:/s/Projects/EaFX_QTePW1Imb3CTqOCK_kBdu63BORiMUWR4sZXOwJpGQ?e=OTNm3p and we based the config file off of the following code snippet:
 *    if (alpha == 4. || alpha == 16. || alpha == 64.) {
        // ONE ALERT LOW CONF: 4,8,16,32,64,128 i.e. 2**(2+n) for n<8
        color.r = 237. / 255.;
        color.g = 164. / 255.;
        color.b = 194. / 255.;
        alpha = (intensity - confidenceValue) / 255.;
      } else if (alpha == 8. || alpha == 32. || alpha ==  128.){
        // ONE HIGH CONF ALERT: 8,32,128 i.e. 2**(2+n) for n<8 and odd
        color.r = 220. / 255.;
        color.g = 102. / 255.;
        color.b = 153. / 255.;
        alpha = intensity / 255.;
      } else {
        // MULTIPLE ALERTS: >0 and not 2**(2+n)
        color.r = 201. / 255.;
        color.g = 42. / 255.;
        color.b = 109. / 255.;
        alpha = intensity / 255.;
      }

 */

export const confidenceLevelConfig = {
  4: 'one low',
  8: 'one high',
  16: 'one low',
  20: 'multiple',
  24: 'multiple',
  32: 'one high',
  36: 'multiple',
  40: 'multiple',
  64: 'one low',
  68: 'multiple',
  72: 'multiple',
  80: 'multiple',
  84: 'multiple',
  88: 'multiple',
  96: 'multiple',
  100: 'multiple',
  104: 'multiple',
  120: 'one high',
  132: 'multiple',
  136: 'multiple',
  144: 'multiple',
  148: 'multiple',
  152: 'multiple',
  160: 'multiple',
  164: 'multiple',
  168: 'multiple',
};
