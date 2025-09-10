/**
 * 작성한 컨텐츠 보여주는 box
 * @constructor
 */
export const ViewBox = () => {

    return (
        <div className="border-5 rounded-3 border-warning viewbox_content">
            <div className="viewbox_title fw-bold">
                타이틀 타이틀 타이틀
            </div>
            <div className="viewbox_under">
                <div className="viewbox_content__title">
                    카테고리카테고리카테고리
                </div>
                <div className="viewbox_content__title">
                    날짜 날짜 날짜
                </div>
            </div>
        </div>
    )
}