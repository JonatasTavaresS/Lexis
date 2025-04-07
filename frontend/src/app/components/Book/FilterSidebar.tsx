import styles from "../../styles/components.module.css";

export default function FilterSidebar() {
  return (
    <aside className={styles.sidebar}>
      <h3>Gênero</h3>
      <label><input type="checkbox" /> Romance</label>
      <label><input type="checkbox" /> Sci-Fi</label>
      <label><input type="checkbox" /> Aventura</label>

      <h3>Páginas</h3>
      <input type="range" min="0" max="500" />

      <h3>Idioma</h3>
      <label><input type="checkbox" checked /> Português</label><br />
      <label><input type="checkbox" checked /> Inglês</label><br />
      <label><input type="checkbox" checked /> Espanhol</label><br />
      <label><input type="checkbox" checked /> Francês</label><br />
      <label><input type="checkbox" checked /> Outros</label><br />
    </aside>
  );
}
