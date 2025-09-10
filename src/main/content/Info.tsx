import {useEffect,useState} from "react";
import ReactMarkdown from "react-markdown";

/**
 * 초기 화면 ReadMe를 처음에 띄우고 초기 게시글 보여주는 화면?
 * @constructor
 */
export const Info =() => {

    const [markdown, setMarkdown] = useState("");
    const [open, setOpen] = useState(true);


    useEffect(() => {
        fetch("./cloakbox_notes.md")
            .then((response) => response.text())
            .then((text) => setMarkdown(text));
    }, []);

    const closeEvent = () => {
        setOpen(false);
    }

    return (
      open && (
          <div className="border border-5 rounded-3 border-light vw-70 p-3 m-5 position-absolute z-3 bg-white">
              <button type="button" className="btn-close float-end" aria-label="Close" onClick={closeEvent}></button>
              <ReactMarkdown>
                  {markdown}
              </ReactMarkdown>
          </div>
        )
    )
}