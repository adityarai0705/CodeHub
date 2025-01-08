import { useState, useEffect } from "react";
import * as d3 from "d3";
import axios from "axios";

const Heatmap = ({ handle }) => {
  const [dataLookup, setDataLookup] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=100000`
        );

        if (!response.ok) {
          alert("No user with this handle");
          throw new Error("No user with this handle");
        }

        const res = await response.json();
        const result = res.result;

        // Filter and process data
        let problemList = result
          .filter((item) => item.verdict === "OK")
          .map((item) => ({
            creationTimeSeconds: item.creationTimeSeconds,
            rating: item.problem.rating,
          }));

        const submissions = {};
        for (const submission of problemList) {
          const date = new Date(submission.creationTimeSeconds * 1000)
            .toISOString()
            .slice(0, 10); // YYYY-MM-DD format

          if (submission.rating !== undefined) {
            if (!submissions[date] || submission.rating > submissions[date].value) {
              submissions[date] = { date: date, value: submission.rating };
            }
          }
        }

        const data = Object.values(submissions);
        const lookup = {};
        data.forEach((entry) => {
          lookup[entry.date] = entry.value;
        });

        setDataLookup(lookup);

        drawHeatmap(lookup);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    if (handle) {
      fetchData();
    }
  }, [handle]);

  const drawHeatmap = (dataLookup) => {
    const getColor = (rating) => {
      if (rating <= 1199) return "rgb( 150, 150, 150)";
      if (rating <= 1399) return "rgb( 156, 252, 136)";
      if (rating <= 1599) return "rgb( 144, 216, 187)";
      if (rating <= 1899) return "rgb( 154, 154, 225)";
      if (rating <= 2099) return "rgb( 240, 142, 249)";
      if (rating <= 2299) return "rgb( 248, 206, 146)";
      if (rating <= 2399) return "rgb( 245, 190, 103)";
      if (rating <= 2599) return "rgb( 238, 127, 123)";
      if (rating <= 2999) return "rgb( 235, 72, 63)";
      return "rgb( 156, 31, 20)";
    };

    const svg = d3.select("#heatmap");
    svg.selectAll("*").remove();

    const minDate = d3.min(Object.keys(dataLookup), (d) => new Date(d));
    const maxDate = new Date();
    const minYear = minDate.getUTCFullYear();
    const maxYear = maxDate.getUTCFullYear();

    const width = 990;
    const cellSize = 17;
    const yearHeight = cellSize * 9;

    svg
      .attr("width", width)
      .attr("height", yearHeight * (maxYear - minYear + 1))
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    const years = d3.range(minYear, maxYear + 1);
    const yearGroup = svg
      .selectAll("g")
      .data(years)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(40.5,${yearHeight * i + cellSize * 1.5})`);

    yearGroup
      .append("text")
      .attr("x", -5)
      .attr("y", -5)
      .attr("font-weight", "bold")
      .attr("text-anchor", "end")
      .attr("fill", "white")
      .text((d) => d);

    yearGroup
      .selectAll(".day")
      .data((year) => d3.timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1)))
      .enter()
      .append("rect")
      .attr("class", "day")
      .attr("width", cellSize - 1)
      .attr("height", cellSize - 1)
      .attr("x", (d) => d3.timeWeek.count(d3.timeYear(d), d) * cellSize + 0.5)
      .attr("y", (d) => d.getDay() * cellSize + 0.5)
      .attr("fill", (d) => {
        const value = dataLookup[d3.timeFormat("%Y-%m-%d")(d)];
        return value !== undefined ? getColor(value) : "white";
      })
      .attr("stroke", "#ccc")
      .append("title")
      .text((d) => {
        const date = d3.timeFormat("%Y-%m-%d")(d);
        const value = dataLookup[date];
        return value !== undefined ? `${date}: ${value}` : `${date}: No data`;
      });
  };

  return (
    <div className="w-full h-auto mt-4 mb-20 rounded-lg p-4">
      <h4 className="text-3xl md:text-5xl font-bold text-[#05CBDC] text-center mb-6">
        Heatmap
      </h4>
      <div className="flex justify-center">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <svg id="heatmap" style={{ width: "100%", height: "auto" }}></svg>
      </div>
    </div>
  );
};

export default Heatmap;
