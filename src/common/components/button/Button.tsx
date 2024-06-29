import React, { memo, useCallback } from "react";
import s from "common/components/button/Button.module.css";
import { Typography } from "common/components/typographi/Typography";
import { IconSvg, IconSvgType } from "../iconSvg/IconSvg";

type ButtonType = {
  name?: string;
  callBack: () => void;
  className?: string;
  disabled?: boolean;
  iconBtn?: IconSvgType;
};
export const Button: React.FC<ButtonType> = memo(({ iconBtn, name, callBack, disabled, className }: ButtonType) => {
  const onclickHandler = useCallback(() => {
    callBack();
  }, [callBack]);

  return (
    <div className={s.universalButton}>
      <button
        onClick={onclickHandler}
        className={`${s.button} ${className} ${disabled && s.disabled}`}
        disabled={disabled}
      >
        {iconBtn && (
          <div className={`${s.iconBtn}`}>
            <IconSvg iconName={iconBtn.iconName} />
          </div>
        )}
        <Typography variant={"p"}>{name}</Typography>
      </button>
    </div>
  );
});
