import { TdMessageBox } from '@type-dom/ui';
import { TypeDiv, addAttrName, addStyleObj, inject, setAttrObj } from '@type-dom/framework';
import { House, houseInjectKey } from '../../views/house';
import { ToolbarItem } from './toolbar-item.class';

export class Toolbar extends TypeDiv {
  className: 'Toolbar';
  private audioItem?: ToolbarItem;
  private screenItem?: ToolbarItem;
  private questionItem?: ToolbarItem;
  private rotateItem?: ToolbarItem;
  private audioBool = false;
  private ScreenBool = true;
  private rotateBool = true;

  constructor(public override parent: House) {
    super();
    this.className = 'Toolbar';
    addAttrName(this, 'toolbar');
    addStyleObj(this, {
      position: 'absolute',
      right: '20px',
      top: '60px',
    });
  }
  override setup() {
    const houseContext = inject(houseInjectKey);
    console.warn('houseContext is ', houseContext);
    this.audioItem = new ToolbarItem({
      parent: this,
      name: 'audio',
      src: 'assets/UI/关闭声音.png',
      height: '20',
      width: '20',
      onClick: (evt, ele) => {
        console.warn('audio click')
        if (this.audioBool) {
          setAttrObj(ele.img, {
            src: 'assets/UI/关闭声音.png'
          });
          // this.model.audio.pause();
          houseContext?.model.audio.pause();
          this.audioBool = false;
        } else {
          setAttrObj(ele.img, {
            src: 'assets/UI/打开声音.png'
          });
          houseContext?.model.audio.play();
          this.audioBool = true;
        }
      },
    });
    this.screenItem = new ToolbarItem({
      parent: this,
      name: 'screen',
      src: 'assets/UI/全屏5.png',
      width: '18',
      height: '18',
      onClick: (evt, ele) => {
        if (this.ScreenBool) {
          this.ScreenBool = false;
          setAttrObj(ele.img, {
            src: 'assets/UI/退出全屏.png'
          });
          houseContext?.model.events.requestFullScreen();
        } else {
          this.ScreenBool = true;
          setAttrObj(ele.img, {
            src: 'assets/UI/全屏5.png'
          });
          houseContext?.model.events.exitFullscreen();
        }
      },
    });
    this.rotateItem = new ToolbarItem({
      parent: this,
      name: 'rotate',
      src: 'assets/UI/停止旋转.png',
      height: '20',
      width: '20',
      onClick: (evt, ele) => {
        if (this.rotateBool) {
          this.rotateBool = false;
          setAttrObj(ele.img, {
            src: 'assets/UI/旋转.png'
          });
          houseContext!.model.rotateBool = false;
        } else {
          this.rotateBool = true;
          setAttrObj(ele.img, {
            src: 'assets/UI/停止旋转.png'
          });
          houseContext!.model.rotateBool = true;
        }
      },
    });
    this.questionItem = new ToolbarItem({
      parent: this,
      name: 'question',
      src: 'assets/UI/帮助5.png',
      height: '22',
      width: '22',
      onClick: () => {
        // TdMessageBox.alert({
        //   // title: '旋转操作',
        //   message: '按住左键不放上下左右拖动，可以旋转整个场景',
        // });
        TdMessageBox.alert('按住左键不放上下左右拖动，可以旋转整个场景','旋转操作')
        // Dialog.alert({
        //   title: '旋转操作',
        //   message: '按住左键不放上下左右拖动，可以旋转整个场景',
        // });
        // this.$alert('按住左键不放上下左右拖动，可以旋转整个场景', '旋转操作', {})
      },
    });
    this.addChildren(
      this.audioItem,
      this.screenItem,
      this.rotateItem,
      this.questionItem
    );
  }
}
