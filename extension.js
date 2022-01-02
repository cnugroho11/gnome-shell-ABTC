const Main = imports.ui.main;
const St = imports.gi.St;
const GObject = imports.gi.GObject;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util;
const Me = imports.misc.extensionUtils.getCurrentExtension();

let myPopup;

const MyPopup = GObject.registerClass(
  class MyPopup extends PanelMenu.Button {
    _init() {
      super._init(0);

      let icon = new St.Icon({
        icon_name: 'security-low-symbolic',
        style_class: 'system-status-icon',
      });

      this.add_child(icon);

      let pmItem1 = new PopupMenu.PopupMenuItem('Battery threshold 100%');
      let pmItem2 = new PopupMenu.PopupMenuItem('Battery threshold 80%');
      let pmItem3 = new PopupMenu.PopupMenuItem('Battery threshold 60%');

      this.menu.addMenuItem(pmItem1);
      this.menu.addMenuItem(pmItem2);
      this.menu.addMenuItem(pmItem3);

      pmItem1.connect('activate', () => {
        try {
          Util.spawn(['/bin/bash', '-c', 'echo 100 | pkexec tee /sys/class/power_supply/BAT0/charge_control_end_threshold']);
        } catch (e) {
          logError(e);
        }
      });

      pmItem2.connect('activate', () => {
        try {
          Util.spawn(['/bin/bash', '-c', 'echo 80 | pkexec tee /sys/class/power_supply/BAT0/charge_control_end_threshold']);
        } catch (e) {
          logError(e);
        }
      });

      pmItem3.connect('activate', () => {
        try {
          Util.spawn(['/bin/bash', '-c', 'echo 60 | pkexec tee /sys/class/power_supply/BAT0/charge_control_end_threshold']);
        } catch (e) {
          logError(e);
        }
      });
    }
  }
);

function init() {

}

function enable() {
  myPopup = new MyPopup();
  Main.panel.addToStatusArea('myPopup', myPopup, 1);
}

function disable() {
  myPopup.destroy();
}
