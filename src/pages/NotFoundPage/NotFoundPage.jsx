import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <section className={s.page_404}>
        <div className={s.container}>
          <div className={s.row}>
            <div className={s.col_sm_12}>
              <div
                className={`${s.col_sm_10} ${s.col_sm_offset_1} ${s.text_center}`}
              >
                <div className={s.four_zero_four_bg}>
                  <h1 className={s.text_center}>404</h1>
                </div>

                <div className={s.contant_box_404}>
                  <h3 className={s.h2}>Look like you're lost</h3>
                  <p>The page you are looking for not available!</p>

                  <Link to="/" className={s.link_404}>
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
