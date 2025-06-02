import styles from "../css/ArrowButton.module.css";

export default function ArrowButton({rotation = 0}: { rotation?: number }) {
  return (
    <button className={styles.arrow_button} style={{rotate: `${rotation}deg`}}>
      <svg className={styles.arrow_button_icon} id="svg"
           enableBackground="new 0 0 128 128" viewBox="0 0 128 128"
           xmlns="http://www.w3.org/2000/svg">
        <path id="Left_Arrow"
              d="m84 108c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656l40-40c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-37.172 37.172 37.172 37.172c1.563 1.563 1.563 4.094 0 5.656-.781.781-1.805 1.172-2.828 1.172z" />
      </svg>
    </button>
  )
}