/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CEnumerable is the base class for all enumerable types.
 * 
 * To define an enumerable type, extend CEnumberable and define string constants.
 * Each constant represents an enumerable value.
 * The constant name must be the same as the constant value.
 * For example,
 * <pre>
 * class TextAlign extends Yii.CEnumerable
 * {
 *     const Left='Left';
 *     const Right='Right';
 * }
 * </pre>
 * Then, one can use the enumerable values such as TextAlign::Left and
 * TextAlign::Right.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CComponent.php 3066 2011-03-13 14:22:55Z qiang.xue $
 * @package system.base
 * @since 1.0
 * @author Charles Pick
 * @class
 */
Yii.CEnumerable = function CEnumerable () {
};
