/*
 * Copyright (c) 2020 - present Cloudogu GmbH
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see https://www.gnu.org/licenses/.
 */

import classNames from "classnames";
import React, { FC } from "react";

type Props = {
  text: string;
  iconColor: string;
  backgroundColor: string;
  className?: string;
};

const SvgIcon: FC<Props> = ({ text, iconColor, backgroundColor, className }) => {
  return (
    <svg viewBox="0 0 64 64" className={classNames("is-family-monospace", className)}>
      <rect width="64px" height="64px" fill={backgroundColor} rx="5px" ry="5px" />
      <text x="32" y="32" fill={iconColor} fontSize="2.5em" dominantBaseline="central" textAnchor="middle">
        {text}
      </text>
    </svg>
  );
};

export default SvgIcon;
