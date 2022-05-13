#![cfg_attr(
  all(not(debug_assertions), target_os = "macos"),
  windows_subsystem = "macos"
)]

use tauri_plugin_sql::{Migration, MigrationKind, TauriSql};
use tauri::{Menu, MenuItem, Submenu};




fn main() {
  let about_menu = Submenu::new("App", Menu::new()
  .add_native_item(MenuItem::Hide)
  .add_native_item(MenuItem::HideOthers)
  .add_native_item(MenuItem::ShowAll)
  .add_native_item(MenuItem::Separator)
  .add_native_item(MenuItem::Quit));

let edit_menu = Submenu::new("Edit", Menu::new()
  .add_native_item(MenuItem::Undo)
  .add_native_item(MenuItem::Redo)
  .add_native_item(MenuItem::Separator)
  .add_native_item(MenuItem::Cut)
  .add_native_item(MenuItem::Copy)
  .add_native_item(MenuItem::Paste)
  .add_native_item(MenuItem::SelectAll));

let view_menu = Submenu::new("View", Menu::new()
  .add_native_item(MenuItem::EnterFullScreen));

let window_menu = Submenu::new("Window", Menu::new()
  .add_native_item(MenuItem::Minimize)
  .add_native_item(MenuItem::Zoom));


let menu = Menu::new()
  .add_submenu(about_menu)
  .add_submenu(edit_menu)
  .add_submenu(view_menu)
  .add_submenu(window_menu);
  
  tauri::Builder::default()
    .menu(menu)
    .plugin(TauriSql::default().add_migrations(
      "sqlite:test.db",
      vec![Migration {
        version: 1,
        description: "create todo",
        sql: include_str!("../migrations/1.sql"),
        kind: MigrationKind::Up,
      }],
    ))
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}