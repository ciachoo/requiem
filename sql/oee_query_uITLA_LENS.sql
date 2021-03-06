select rownum+(select max(id) from oee_master2) id,':inicio' s_start_dt, 
':final' s_end_dt, a.* , (availability * performance * yield) oee from ( 
select bu_id, depto, product, process, machine system_id, round((to_date(':final','yyyy-mm-dd hh24:mi') - to_date(':inicio','yyyy-mm-dd hh24:mi'))*24*60,0) 
sample_span_time, round(sum(cycle_time/60),0) total_production_time,
  count(serial_num) build_qty,
  round(sum(cycle_time/60)/count(serial_num),2) avg_ct,
  sum(cycle_time/60)/round((to_date(':final','yyyy-mm-dd hh24:mi') - to_date(':inicio','yyyy-mm-dd hh24:mi'))*24*60,0) availability,
  (min(ideal_cycle_time)/(sum(cycle_time/60) /count(serial_num))) Performance,
  sum(case when PASS_FAIL = 'P' then 1 else 0 end)/count(serial_num) Yield
from (select * from phase2.los_assembly@mxoptix where system_id in ('CYBOND7','CYBOND8')) a left join apogee.oee_machine_catalog b on a.system_id=b.machine 
where process_date between to_date(':inicio','yyyy-mm-dd hh24:mi') and to_date(':final','yyyy-mm-dd hh24:mi') 
--  and step_name = 'TOSA SUBASSEM3 (SUBASSEM2, SI LENS)'
group by bu_id, depto, product, process, machine
)a